import api from '@/services/api';

export const baseURL =
	'https://my-json-server.typicode.com/masouda1997/fake-data-server/';

export const handleResponse = <T>(p: Promise<any>): Promise<T> =>
	p.then((res) => res.data as T);

export const get = <T = any>(url: string): Promise<T> =>
	handleResponse<T>(api.get(url));

export const remove = <T = any>(url: string): Promise<T> =>
	handleResponse<T>(api.delete(url));

export const update = <T = any, P = any>(url: string, payLoad: P): Promise<T> =>
	handleResponse<T>(api.put(url, payLoad));

export const list = <T = any>(url: string, params?: string): Promise<T[]> =>
	handleResponse<T[]>(api.get(url, { params }));

export const create = <T = any, P = any>(url: string, payLoad: P): Promise<T> =>
	handleResponse<T>(api.post(url, payLoad));
