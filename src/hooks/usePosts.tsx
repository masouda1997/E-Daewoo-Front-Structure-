import { postsService } from '@/services/post.service';
import { postsKeys } from '@/utils/queryKeys';
import { useQuery } from '@tanstack/react-query';

export const useAllPosts = () =>
	useQuery({
		queryKey: ['allPosts'],
		queryFn: () => postsService.getAll(),
	});

export const usePost = (id?: number) =>
	useQuery({
		queryKey: id ? postsKeys.detail(id) : ['post', 'empty'],
		enabled: !!id,
		queryFn: () => postsService.getById(id as number),
	});
