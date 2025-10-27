import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { dataOptions } from '@/providers/reactQuery/fakeData';
import { getQueryClient } from '@/providers/reactQuery/get-query-client';
import { ClientComponent } from '@/providers/reactQuery/ClientComponentDemo';

export default function ServerComponent() {
	const queryClient = getQueryClient();

	void queryClient.prefetchQuery(dataOptions);

	return (
		<div>
			inside the server component:
			<h1>Pokemon Info</h1>
			<HydrationBoundary state={dehydrate(queryClient)}>
				<ClientComponent />
			</HydrationBoundary>
		</div>
	);
}
