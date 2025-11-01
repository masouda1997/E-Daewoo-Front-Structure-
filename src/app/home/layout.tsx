'use client';
import '../../styles/antdReStyles.css';
import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { BellRing } from 'lucide-react';
import ThemeToggle from '@/components/layout/ThemeToggler';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];
function getItem(
	label: React.ReactNode,
	key: React.Key,
	icon?: React.ReactNode,
	children?: MenuItem[],
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
	} as MenuItem;
}

const items: MenuItem[] = [
	getItem('Option 1', '1', <BellRing />),
	getItem('Option 2', '2', <BellRing />),
	getItem('User', 'sub1', <BellRing />, [
		getItem('Tom', '3'),
		getItem('Bill', '4'),
		getItem('Alex', '5'),
	]),
	getItem('Team', 'sub2', <BellRing />, [
		getItem('Team 1', '6'),
		getItem('Team 2', '8'),
	]),
	getItem('Files', '9', <BellRing />),
];

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [collapsed, setCollapsed] = useState(false);
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();
	return (
		<Layout className="!min-h-screen ">
			<Sider
				theme="light"
				className=" "
				collapsible
				collapsed={collapsed}
				onCollapse={(value) => setCollapsed(value)}
			>
				<div className="demo-logo-vertical">LOGO</div>
				<Menu
					theme="light"
					defaultSelectedKeys={['1']}
					mode="inline"
					items={items}
				/>
			</Sider>

			<Layout>
				{/* <Header > */}
				<div className=" flex justify-end-safe !px-2 ">
					<ThemeToggle />
				</div>
				{/* </Header> */}
				<Content className="m-1 ">
					{/* <Breadcrumb
						style={{ margin: '16px 0' }}
						items={[{ title: 'User' }, { title: 'Bill' }]}
					/> */}
					<div>{children}</div>
				</Content>
				<Footer style={{ textAlign: 'center' }}>
					Ant Design ©{new Date().getFullYear()} Created by Ant UED
				</Footer>
			</Layout>
		</Layout>
	);
}
