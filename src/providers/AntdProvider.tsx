'use client';

import faIR from 'antd/locale/fa_IR';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider, App as AntApp, theme as antdTheme } from 'antd';
import { useAppSelector } from '../lib/hooks';
import { RootState } from '@/lib/store';
import { readCssVar } from '@/utils';

const { defaultAlgorithm, darkAlgorithm } = antdTheme;

export default function AntdProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const themeInStore = useAppSelector((state: RootState) => state.theme.theme);
	const isDark = themeInStore === 'dark' ? darkAlgorithm : defaultAlgorithm;

	const components: any = {
		// Button: {
		// 	colorPrimary: '#05596b',
		// 	algorithm: true, // Enable algorithm
		// },
		// Input: {
		// 	colorPrimary: '#eb2f96',
		// 	algorithm: true, // Enable algorithm
		// },
		// InputNumber: {
		// 	colorPrimary: '#455563',
		// 	algorithm: true,
		// },
	};

	return (
		<AntdRegistry>
			<ConfigProvider
				direction="rtl"
				locale={faIR}
				theme={{ algorithm: isDark, components }}
			>
				<AntApp>{children}</AntApp>
			</ConfigProvider>
		</AntdRegistry>
	);
}

// const token: any = {
// 	colorPrimary: 'var(--brand-primary)',
// 	colorBgLayout: 'var(--layout-bg)',
// 	colorBgContainer: 'var(--content-bg)',
// 	colorText: 'var(--sider-foreground)',
// 	borderRadiusLG: 'var(--radius-lg)',
// 	// add more token mappings if you need them
// };

// @@@@@@@@@@@@@@@@@@@@@@ newer
// const token: any = {
// 	// colorPrimary: readCssVar('--color-primary', '#A2AF9B'),
// 	// colorBgBase: readCssVar('--color-bg', '#FAF9EE'),
// 	// colorBgContainer: readCssVar('--color-surface-muted', '#454522'),
// 	// colorTextBase: 'var(--color-text-primary)',
// 	// colorText: 'var(--color-text-primary)',
// 	// colorTextSecondary: 'var(--color-text-secondary)',
// 	// borderRadius: 'var(--border-radius-base)',
// 	// fontSize: 'var(--font-size-base)',
// };
