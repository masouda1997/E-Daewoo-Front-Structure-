import Link from 'next/link';

export default function Home() {
	return (
		<div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen  pb-20 gap-16 !sm:p-20 bg-pink-200">
			<main className="flex p-10 bg-blue-200  gap-[32px] row-start-2 items-center  sm:items-start ">
				{/* <Counter />
				<ServerComponent /> */}
				<Link
					className="mb-5.5 inline-block border-2 border-amber-600"
					href="/dashboard"
				>
					home
				</Link>
			</main>
		</div>
	);
}
