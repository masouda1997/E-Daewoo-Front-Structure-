'use client';

import React from 'react';
import Link from 'next/link';
import { Layout, Menu, Button, Typography, Space, Row, Col } from 'antd';
import { LayoutDashboard, LogIn, LogOut, SquareUser } from 'lucide-react';

const { Header, Content } = Layout;
const { Title } = Typography;

export default function Home() {
	return (
		<main className="min-h-screen bg-gradient-to-bl from-blue-50 to-white flex flex-col-reverse md:flex-col-reverse">
			{/* <Link
				className="mb-5.5 inline-  block rounded-lg bg-blue-500 px-5 py-3 text-center font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
				href="/home"
			>
				login
			</Link> */}
			<Header className="flex items-center justify-between px-6 bg-white shadow-sm">
				<div className="flex items-center gap-4">
					<Title level={4} className="!m-0">
						My App
					</Title>

					<Menu
						mode="horizontal"
						selectable={false}
						className="!bg-transparent"
					>
						<Menu.Item key="dashboard" icon={<LayoutDashboard />}>
							<Link href="/dashboard">Dashboard</Link>
						</Menu.Item>
					</Menu>
				</div>

				<div>
					{/* Visible always in UI-only mock — wire to auth state later */}
					<Button type="text" icon={<LogOut />}>
						Log out
					</Button>
				</div>
			</Header>

			<Content className="flex items-center justify-center p-10">
				<div className="w-full max-w-xl bg-white rounded-2xl shadow-md p-10">
					<Row justify="center" className="mb-6">
						<Col>
							<Title level={2} className="text-center">
								Welcome — Sign in or Sign up
							</Title>
						</Col>
					</Row>

					<Row justify="center">
						<Col>
							<Space
								direction="vertical"
								size="large"
								className="w-full"
							>
								<div className="flex justify-center">
									<Button type="primary" size="large" icon={<LogIn />}>
										Sign in
									</Button>
								</div>

								<div className="flex justify-center">
									<Button
										type="default"
										size="large"
										icon={<SquareUser />}
									>
										Sign up
									</Button>
								</div>

								<div className="flex justify-center">
									<Link
										className="text-sm text-blue-600 hover:underline-offset-0 hover:underline"
										href="/home"
									>
										login
									</Link>
								</div>

								<div className="flex justify-center pt-4 text-sm text-gray-500">
									<span>Or continue with your company account</span>
								</div>
							</Space>
						</Col>
					</Row>
				</div>
			</Content>
		</main>
	);
}
