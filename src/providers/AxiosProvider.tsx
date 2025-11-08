'use client';
// providers/AxiosProvider.tsx

import axios from 'axios';
import api from '@/services/api';
import { notification } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
	selectAccessToken,
	setAccessToken,
	clearAuth,
} from '@/features/auth/authSlice';

type Props = { children: React.ReactNode };

const AxiosProvider: React.FC<Props> = ({ children }) => {
	const [apiNotify, contextHolder] = notification.useNotification();
	const dispatch = useAppDispatch();
	const router = useRouter();

	// get token from redux
	const accessToken = useAppSelector(selectAccessToken);

	// keep a ref of the latest token so interceptors can read it
	const tokenRef = useRef<string | null>(accessToken);
	useEffect(() => {
		tokenRef.current = accessToken ?? null; // the same as (accessToken !== null && accessToken !== undefined) ? accessToken : null;
	}, [accessToken]);

	// single-refresh guard state (module-level within this component) prevent duplicate refreshes and let multiple callers wait for the new token by subscribing callbacks.
	const isRefreshingRef = useRef(false);
	const refreshSubscribersRef = useRef<Array<(token: string | null) => void>>(
		[],
	);
	const subscribeTokenRefresh = (cb: (token: string | null) => void) => {
		refreshSubscribersRef.current.push(cb);
	};
	const onRefreshed = (token: string | null) => {
		refreshSubscribersRef.current.forEach((cb) => cb(token));
		refreshSubscribersRef.current = [];
	};

	// error composer moved here to use apiNotify & dispatch
	const errorComposer = (error: any) => {
		const statusCode = error?.response?.status;

		if (statusCode === 400) {
			// 400 Bad Request
			const errorMessage =
				error.response?.data?.message?.value ||
				'درخواست مورد نظر قابل پردازش نمیباشد';
			apiNotify.error({ message: 'خطا', description: errorMessage });
		}
		if (statusCode === 401) {
			// 401 Unauthorized
			apiNotify.error({ message: 'خطا', description: 'عدم احراز هویت' });
			dispatch(clearAuth()); // clear auth and redirect to homepage or login
			router.push('/'); // use next/navigation router to redirect
		}
		if (statusCode === 403) {
			// 403 Forbidden: Authentication/authorization issues.
			apiNotify.error({ message: 'خطا', description: 'عدم دسترسی' });
			dispatch(clearAuth());
			router.push('/');
		}
		if (statusCode === 404) {
			apiNotify.error({
				message: 'خطا',
				description: 'سرویس مورد نظر یافت نشد',
			});
		}
		if (statusCode === 500) {
			apiNotify.error({
				message: 'خطا',
				description: 'خطای سروری رخ داده است',
			});
		}
		if (statusCode === 422) {
			const listOfErrors: string[] = [];
			for (const key in error.response.data.errors) {
				if (
					Object.prototype.hasOwnProperty.call(
						error.response.data.errors,
						key,
					)
				) {
					listOfErrors.push(error.response.data.errors[key][0]);
				}
			}
			apiNotify.error({
				message: 'خطا',
				description: (
					<ul>
						{listOfErrors.map((item: string, index: number) => (
							<li key={index}>{item}</li>
						))}
					</ul>
				),
			});
		}
	};

	useEffect(() => {
		// RESPONSE INTERCEPTOR
		const responseInterceptor = api.interceptors.response.use(
			(res) => res,
			async (error) => {
				// If the error is not from our axios instance (or no config) -> pass
				const originalRequest = error?.config;
				if (!originalRequest) {
					errorComposer(error);
					return Promise.reject(error);
				}

				// For 401 errors, try to refresh
				if (error.response?.status === 401 && !originalRequest._retry) {
					// queue requests until refresh finishes
					if (isRefreshingRef.current) {
						return new Promise((resolve, reject) => {
							subscribeTokenRefresh((token) => {
								if (token) {
									originalRequest.headers =
										originalRequest.headers ?? {};
									originalRequest.headers['Authorization'] =
										`Bearer ${token}`;
									resolve(api(originalRequest));
								} else {
									reject(error);
								}
							});
						});
					}

					originalRequest._retry = true;
					isRefreshingRef.current = true;

					try {
						// call refresh endpoint — backend should read HttpOnly cookie and return new access token
						const refreshRes = await axios.post(
							`${process.env.NEXT_PUBLIC_API_BASE ?? ''}/auth/refresh`,
							{},
							{ withCredentials: true },
						);

						const newToken = refreshRes?.data?.accessToken ?? null;
						if (newToken) {
							// update redux store
							dispatch(setAccessToken({ accessToken: newToken }));
							onRefreshed(newToken);
							isRefreshingRef.current = false;

							// retry original
							originalRequest.headers = originalRequest.headers ?? {};
							originalRequest.headers['Authorization'] =
								`Bearer ${newToken}`;
							return api(originalRequest);
						} else {
							// no token returned -> force logout
							isRefreshingRef.current = false;
							onRefreshed(null);
							dispatch(clearAuth());
							router.push('/');
							return Promise.reject(error);
						}
					} catch (refreshError) {
						isRefreshingRef.current = false;
						onRefreshed(null);
						// refresh failed -> full sign out
						dispatch(clearAuth());
						router.push('/');
						return Promise.reject(refreshError);
					}
				}

				// other error statuses -> show notifications
				errorComposer(error);
				return Promise.reject(error);
			},
		);

		// REQUEST INTERCEPTOR
		const requestInterceptor = api.interceptors.request.use((config) => {
			config.headers = config.headers ?? {};
			if (tokenRef.current) {
				config.headers['Authorization'] = `Bearer ${tokenRef.current}`;
			}
			return config;
		});

		return () => {
			api.interceptors.response.eject(responseInterceptor);
			api.interceptors.request.eject(requestInterceptor);
		};
		// NOTE: we intentionally pass an empty deps array so interceptors are registered once on mount.
		// tokenRef is used to keep latest token without re-registering.
	}, [apiNotify, dispatch, router]); // apiNotify stable across renders

	// On mount: try to bootstrap access token (call refresh)
	useEffect(() => {
		(async () => {
			try {
				const res = await axios.post(
					`${process.env.NEXT_PUBLIC_API_BASE ?? ''}/auth/refresh`,
					{},
					{ withCredentials: true },
				);
				const token = res?.data?.accessToken ?? null;
				if (token) {
					dispatch(setAccessToken({ accessToken: token }));
				}
			} catch (err) {
				// ignore bootstrap failure — user not authenticated
			}
		})();
		// run once on mount
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<>
			{contextHolder}
			{children}
		</>
	);
};

export default AxiosProvider;
