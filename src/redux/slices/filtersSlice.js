import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
	name: 'filtersSlice',
	initialState: {
		searchValue: '',
	},
	reducers: {
		setSearchValue(state, action) {
			state.searchValue = action.payload.searchValue;
		},
	},
});

export const { setSearchValue } = filtersSlice.actions;
export default filtersSlice.reducer;
