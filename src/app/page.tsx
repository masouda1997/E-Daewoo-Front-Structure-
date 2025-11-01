import Link from 'next/link';

export default function Home() {
	return (
		<div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen  pb-20 gap-16 !sm:p-20">
			<main className="flex p-10 bg-gradient-to-bl from-blue-300 to-blue-400  gap-[32px] row-start-2 items-center  sm:items-start ">
				<Link
					className="mb-5.5 inline-  block rounded-lg bg-blue-500 px-5 py-3 text-center font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
					href="/home"
				>
					login
				</Link>
			</main>
		</div>
	);
}
