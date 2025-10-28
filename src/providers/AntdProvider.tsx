'use client';

import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider, App as AntApp } from 'antd';
import faIR from 'antd/locale/fa_IR';
import theme from './config/theme';
// import theme from "./config/theme";

export default function AntdProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<AntdRegistry>
			<ConfigProvider direction="rtl" locale={faIR} theme={theme}>
				<AntApp>{children}</AntApp>
			</ConfigProvider>
		</AntdRegistry>
	);
}
