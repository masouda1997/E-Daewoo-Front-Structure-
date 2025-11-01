'use client';

import { useEffect } from 'react';
import { RootState } from '@/lib/store';
// import { setTheme } from '@lib/store/features/themeSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setTheme } from '@/features/theme/themeSlice';

export function ThemeSync() {
	const theme = useAppSelector((state: RootState) => state.theme.theme);
	const dispatch = useAppDispatch();

	// On mount: read saved value and sync Redux (client-only)
	useEffect(() => {
		try {
			const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
			if (saved && saved !== theme) {
				dispatch(setTheme(saved));
			}
		} catch (e) {
			// ignore (privacy mode)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []); // run only once
	// Whenever theme in store changes: update html class + localStorage
	useEffect(() => {
		try {
			localStorage.setItem('theme', theme);
		} catch (e) {}

		if (theme === 'light') {
			document.documentElement.classList.add('light');
			document.documentElement.classList.remove('dark');
		} else {
			document.documentElement.classList.add('dark');
			document.documentElement.classList.remove('light');
		}
	}, [theme]);

	// On mount: ensure DOM matches Redux state (useful after SSR/hydration)
	// useEffect(() => {
	// 	// Update localStorage
	// 	localStorage.setItem('theme', theme);

	// 	// Update <html> class
	// 	if (theme === 'light') {
	// 		document.documentElement.classList.add('light');
	// 		document.documentElement.classList.remove('dark');
	// 	} else {
	// 		document.documentElement.classList.add('dark');
	// 		document.documentElement.classList.remove('light');
	// 	}
	// }, [theme]);

	// Optional: Listen for system preference changes (if you want auto-switch)
	// useEffect(() => {
	//   const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
	//   const handleChange = (e: MediaQueryListEvent) => {
	//     dispatch(setTheme(e.matches ? 'dark' : 'light'));
	//   };
	//   mediaQuery.addEventListener('change', handleChange);
	//   return () => mediaQuery.removeEventListener('change', handleChange);
	// }, [dispatch]);

	return null;
}
