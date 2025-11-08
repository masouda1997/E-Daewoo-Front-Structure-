// this file cuases while invalidation of query yiu wont get missing

export const postsKeys = {
	all: ['posts'] as const,
	lists: (params?: any) => [...postsKeys.all, 'list', params] as const,
	detail: (id: number) => [...postsKeys.all, 'detail', id] as const,
};
