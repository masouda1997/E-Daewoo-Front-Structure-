'use client';

import React from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { dataOptions } from '@/providers/reactQuery/fakeData';
import Image from 'next/image';

export function ClientComponent() {
	const { data } = useSuspenseQuery(dataOptions); //same as useQuery but for suspense

	return (
		<div>
			inside the client component:
			<figure>
				<Image
					src={data.sprites.front_shiny}
					height={200}
					alt={data.name}
				/>
				<h2>
					{`I'm`}{' '}
					{/* to avoid ESLint error or you can this rule ==> 'react/no-unescaped-entities': ['error', { forbid: ['>', '}', '"'] }] // exclude "'"*/}
					{data.name}
				</h2>
			</figure>
		</div>
	);
}
