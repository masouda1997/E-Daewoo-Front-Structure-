'use client';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
	increment,
	decrement,
	reset,
	incrementByAmount,
} from '@/features/counter/counterSlice';
import { useState } from 'react';

export default function Counter() {
	const count = useAppSelector((state) => state.counter.value);
	const dispatch = useAppDispatch();
	const [amount, setAmount] = useState(0);

	return (
		<div className="flex flex-col items-center gap-3 p-4 border rounded-md w-64">
			<h2 className="text-xl font-semibold">Counter: {count}</h2>

			<div className="flex gap-2">
				<button
					onClick={() => dispatch(increment())}
					className="bg-blue-500 text-white px-3 py-1 rounded"
				>
					+
				</button>

				<button
					onClick={() => dispatch(decrement())}
					className="bg-red-500 text-white px-3 py-1 rounded"
				>
					-
				</button>
			</div>

			<div className="flex items-center gap-2 mt-2">
				<input
					type="number"
					value={amount}
					onChange={(e) => setAmount(Number(e.target.value))}
					className="border px-2 py-1 w-16 center rounded-md overflow-hidden text-center"
				/>
				<button
					onClick={() => dispatch(incrementByAmount(amount))}
					className="bg-green-500 text-white px-3 py-1 rounded"
				>
					Add
				</button>

				<button
					onClick={() => dispatch(reset())}
					className="bg-gray-500 text-white px-3 py-1 rounded"
				>
					Reset
				</button>
			</div>
		</div>
	);
}
