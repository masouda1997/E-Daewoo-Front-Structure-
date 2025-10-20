'use client';
// Any component that interacts with the Redux store (creating it, providing it, reading from it, or writing to it) needs to be a client component. This is because accessing the store requires React context, and context is only available in client components.

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { AppStore, makeStore } from '@/lib/store';

function StoreProvider({ children }: { children: React.ReactNode }) {
	const storeRef = useRef<AppStore | null>(null);
	if (!storeRef.current) {
		storeRef.current = makeStore();
		// storeRef.current =(await import('@/lib/store')).makeStore()
		//not suitable to use dynamic import here because we need the store synchronously during the first render but make the bundle smaller by code splitting
		// storeRef.current.dispatch(initializeCount(count))
	}

	return <Provider store={storeRef.current}>{children}</Provider>;
}

export default StoreProvider;

//This component will only be rendered once per request on the server, but might be re-rendered multiple times on the client if there are stateful client components located above this component in the tree, or if this component also contains other mutable state that causes a re-render.
