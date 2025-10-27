'use client';

import axios from 'axios';
import { notification } from 'antd';
import { getSession, signOut } from 'next-auth/react';
import { useEffect } from 'react';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE;
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';

const AxiosProvider = ({ children }: { children: React.ReactNode }) => {
	const [api, contextHolder] = notification.useNotification();

	const errorComposer = (error: any) => {
		const statusCode = error?.response?.status;

		if (statusCode === 404) {
			api.error({
				message: 'خطا',
				description: 'سرویس مورد نظر یافت نشد',
			});
		}

		if (statusCode === 401) {
			api.error({
				message: 'خطا',
				description: 'عدم احراز هویت',
			});
			signOut({ callbackUrl: '/' });
		}

		if (statusCode === 400) {
			const errorMessage =
				error.response?.data?.message?.value ||
				'درخواست مورد نظر قابل پردازش نمیباشد';
			api.error({
				message: 'خطا',
				description: errorMessage,
			});
		}

		if (statusCode === 403) {
			api.error({
				message: 'خطا',
				description: 'عدم دسترسی',
			});
			signOut({ callbackUrl: '/' });
		}

		if (statusCode === 500) {
			api.error({
				message: 'خطا',
				description: 'خطای سروری رخ داده است',
			});
		}

		if (statusCode === 422) {
			const listOfErrors = [];

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

			api.error({
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
		const responseInterceptor = axios.interceptors.response.use(
			(response) => response,
			(error) => {
				errorComposer(error);
				return Promise.reject(error);
			},
		);

		return () => {
			axios.interceptors.response.eject(responseInterceptor);
		};
	}, [api]);

	axios.interceptors.request.use(async (request) => {
		const session = (await getSession()) as any;
		if (session) {
			request.headers.Authorization = `Bearer ${session.accessToken}`;
		}
		return request;
	});

	return (
		<>
			{contextHolder}
			{children}
		</>
	);
};

export default AxiosProvider;
