// this wrapper prevents React Context is unavailable in Server Components error when using SessionProvider in layout.tsx by wrapped it in a separate client component
'use client';

import { SessionProvider } from 'next-auth/react';
import type { ReactNode } from 'react';

export default function SessionProviderWrapper({
	children,
}: {
	children: ReactNode;
}) {
	return <SessionProvider>{children}</SessionProvider>;
}
