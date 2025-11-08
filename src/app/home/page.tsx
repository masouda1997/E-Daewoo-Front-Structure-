'use client';
import Counter from '@/components/UI/Counter';
import FormTest from '@/components/UI/FormTest';
import { useAllPosts, usePost } from '@/hooks/usePosts';
import ServerComponent from '@/providers/reactQuery/ServerComponentDemo';
import { Button } from 'antd';
import React from 'react';

const Home = () => {
	const { data: posts } = useAllPosts();
	const { data: post } = usePost(1);
	return (
		<>
			<div className="flex justify-center items-center p-2 border-2 border-purple-500">
				{/* <Counter /> */}
				{/* <ServerComponent /> */}
				<FormTest />
			</div>
			<ul>
				taka a loook at here
				{posts?.map((p: any) => (
					<li key={p.id}>
						{p.title}
						<Button onClick={() => console.log('object')}>test</Button>
					</li>
				))}
				and this one is a single one
				<br />
				{post?.title}
			</ul>
		</>
	);
};

export default Home;
