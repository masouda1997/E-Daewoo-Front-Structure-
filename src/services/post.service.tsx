import * as base from './baseService';
import { CreatePostDto, Post, UpdatePostDto } from '@/types/post.type';

const baseUrl = base.baseURL;
const endpoint = 'posts';
const url = `${baseUrl}${endpoint}`;
export const postsService = {
	getAll: () => base.get(url),

	getById: (id: number) => base.get<Post>(`${url}/${id}`),

	// create: (payload: CreatePostDto) =>
	// 	base.create<Post, CreatePostDto>(url, payload),

	// update: (id: number, payload: UpdatePostDto) =>
	// 	base.update<Post, UpdatePostDto>(`${url}/${id}`, payload),

	// remove: (id: number) => base.remove<void>(`${url}/${id}`),
};
