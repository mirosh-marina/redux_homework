import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const filtersAdapter = createEntityAdapter();

// const initialState = {
// 	filters: [],
// 	startFilter: 'no',
// 	activeFilterElement: 'all'
// }

const initialState = filtersAdapter.getInitialState({
	startFilter: 'no',
	activeFilterElement: 'all'
})

const filtersSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		// startFilter: (state, action) => {
		// 	state.startFilter = 'yes';
		// 	filtersAdapter.addMany(state, action.payload)
		// },
		// delFilter: (state) => {			
		// 	state.startFilter = 'no';
		// 	state.activeFilterElement = 'all';
		// 	filtersAdapter.removeAll(state)
		// },
		addActiveFilterElement: (state, action) => {
			state.activeFilterElement = action.payload
		}
	}
});

const {actions, reducer} = filtersSlice;

export default reducer;


export const {
	// startFilter,
	// delFilter,
	addActiveFilterElement
} = actions;