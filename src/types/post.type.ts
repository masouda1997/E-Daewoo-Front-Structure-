export type Post = {
	id: number;
	title: string;
};

export type CreatePostDto = {
	title: string;
};

export type UpdatePostDto = {
	title?: string;
};
