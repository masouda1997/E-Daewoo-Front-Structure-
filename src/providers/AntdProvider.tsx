'use client';

import faIR from 'antd/locale/fa_IR';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider, App as AntApp, theme as antdTheme } from 'antd';
import { useAppSelector } from '../lib/hooks';
import { RootState } from '../lib/store';

const { defaultAlgorithm, darkAlgorithm } = antdTheme;
// import theme from "./config/theme";

export default function AntdProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const theme = useAppSelector((state: RootState) => state.theme.theme);
	const algorithm = theme === 'dark' ? darkAlgorithm : defaultAlgorithm;
	// const token: any = {
	// 	colorPrimary: 'var(--brand-primary)',
	// 	colorBgLayout: 'var(--layout-bg)',
	// 	colorBgContainer: 'var(--content-bg)',
	// 	colorText: 'var(--sider-foreground)',
	// 	borderRadiusLG: 'var(--radius-lg)',
	// 	// add more token mappings if you need them
	// };
	return (
		<AntdRegistry>
			<ConfigProvider direction="rtl" locale={faIR} theme={{ algorithm }}>
				<AntApp>{children}</AntApp>
			</ConfigProvider>
		</AntdRegistry>
	);
}
