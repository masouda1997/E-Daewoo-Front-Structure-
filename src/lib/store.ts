import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';

// Returns a new store instance with an empty set of reducers
export const makeStore = () => {
	return configureStore({
		reducer: {
			counter: counterReducer,
		},
	});
};

//type of the store returned by makeStore.
export type AppStore = ReturnType<typeof makeStore>;
//type of the state inside that store (what you get from store.getState()).
export type RootState = ReturnType<AppStore['getState']>;
//type of the dispatch function of that store (how you dispatch actions)
export type AppDispatch = AppStore['dispatch'];

// Now we have a function, makeStore, that we can use to create a store instance per-request while retaining the strong type safety (if you choose to use TypeScript) that Redux Toolkit provides.
