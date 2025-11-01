import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Theme = 'light' | 'dark';

interface ThemeState {
	theme: Theme;
}

// const getInitialTheme = (): Theme => {
// 	if (typeof window !== 'undefined') {
// 		const saved = localStorage.getItem('theme');
// 		if (saved === 'dark' || saved === 'light') return saved;
// 	}
// 	return 'light'; // default
// };

const initialState: ThemeState = {
	// theme: getInitialTheme(),
	theme: 'light',
};

const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		toggleTheme: (state) => {
			state.theme = state.theme === 'light' ? 'dark' : 'light';
		},
		setTheme: (state, action: PayloadAction<Theme>) => {
			state.theme = action.payload;
		},
	},
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
