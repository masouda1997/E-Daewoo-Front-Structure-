import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import React from 'react';

type AuthState = {
	accessToken: string | null;
	user?: { id?: string; email?: string } | null;
};

const initialState: AuthState = {
	accessToken: null,
	user: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAccessToken(
			state,
			action: PayloadAction<{ accessToken: string; user?: any }>,
		) {
			state.accessToken = action.payload.accessToken;
			if (action.payload.user) {
				state.user = action.payload.user;
			}
		},
		clearAuth(state) {
			state.accessToken = null;
			state.user = null;
		},
	},
});

export const { setAccessToken, clearAuth } = authSlice.actions;
export default authSlice.reducer;

export const selectAccessToken = (state: { auth: AuthState }) =>
	state.auth.accessToken;
