'use client';

import React from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { dataOptions } from '@/providers/reactQuery/fakeData';

export function ClientComponent() {
	const { data } = useSuspenseQuery(dataOptions); //same as useQuery but for suspense

	return (
		<div>
			inside the client component:
			<figure>
				<img src={data.sprites.front_shiny} height={200} alt={data.name} />
				<h2>I'm {data.name}</h2>
			</figure>
		</div>
	);
}
