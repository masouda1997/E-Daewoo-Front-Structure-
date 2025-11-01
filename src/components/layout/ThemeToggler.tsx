'use client';

import { toggleTheme } from '@/features/theme/themeSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';
import { Button } from 'antd';

export default function ThemeToggle() {
	const theme = useAppSelector((state: RootState) => state.theme.theme);
	const dispatch = useAppDispatch();

	return (
		<Button type="primary" onClick={() => dispatch(toggleTheme())}>
			{theme === 'light' ? 'dark' : 'light'}
		</Button>
	);
}
