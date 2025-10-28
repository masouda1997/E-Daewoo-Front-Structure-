import Counter from '@/components/UI/Counter';
import ServerComponent from '@/providers/reactQuery/ServerComponentDemo';
import React from 'react';

const Home = () => {
	return (
		<div className="flex justify-center items-center p-2 border-2 border-purple-500">
			<Counter />
			<ServerComponent />
		</div>
	);
};

export default Home;
