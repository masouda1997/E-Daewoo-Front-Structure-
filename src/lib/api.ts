// lib/api.ts
import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'https://api.example.com';

export const api = axios.create({
	baseURL: API_BASE,
	withCredentials: true, // important so refresh endpoint receives HttpOnly cookie
	headers: {
		'Content-Type': 'application/json; charset=utf-8',
	},
});

// export default api for convenience
export default api;
