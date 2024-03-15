import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	filters: [],
	startFilter: 'no',
	activeFilterElement: 'all'
}

const filtersSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		startFilter: (state, action) => {
			state.startFilter = 'yes';
			state.filters.push(action.payload)
		},
		delFilter: state => {
			state.filters = [];
			state.startFilter = 'no';
			state.activeFilterElement = 'all';
		},
		addActiveFilterElement: (state, action) => {
			state.activeFilterElement = action.payload
		}
	}
});

const {actions, reducer} = filtersSlice;

export default reducer;
export const {
	startFilter,
	delFilter,
	addActiveFilterElement
} = actions;