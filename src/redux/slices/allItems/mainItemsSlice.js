import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';
import axios from '@/axios.js';

//===============================================

const mainItemsAdapter = createEntityAdapter({
	sortComparer: (a, b) => a.id - b.id,
});

const initialState = mainItemsAdapter.getInitialState({
	isMainItemsLoading: true,
	error: null,
	status: '',
});

const mainItemsSelectors = mainItemsAdapter.getSelectors(
	state => state.allItems.mainItems
);

//===============================================

const requestMainItems = createAsyncThunk(
	'mainItems/requestMainItems',
	async (_, { dispatch, rejectWithValue }) => {
		try {
			const { data, statusText } = await axios.get('/items');

			if (statusText !== 'OK') {
				throw new Error();
			}

			dispatch(setMainItems(data));
		} catch (error) {
			return rejectWithValue({
				error: `${error.message}: Ошибка получение данных [mainItems]`,
			});
		}
	}
);

//===============================================

const mainItemsSlice = createSlice({
	name: 'mainItems',
	initialState: initialState,
	reducers: {
		setMainItems: mainItemsAdapter.upsertMany,
	},
	extraReducers: {
		[requestMainItems.pending]: state => {
			state.error = null;
			state.isMainItemsLoading = true;
			state.status = 'pending';
		},
		[requestMainItems.fulfilled]: state => {
			state.isMainItemsLoading = false;
			state.status = 'fulfilled';
		},
		[requestMainItems.rejected]: (state, action) => {
			state.error = action.payload.error;
			state.isMainItemsLoading = false;
			state.status = 'rejected';
		},
	},
});

//===============================================

export { requestMainItems };
export const {
	selectById: selectByIdMainItems,
	selectIds: selectIdsMainItems,
	selectEntities: selectEntitiesMainItems,
	selectAll: selectAllMainItems,
	selectTotal: selectTotalMainItems,
} = mainItemsSelectors;
export const { setMainItems } = mainItemsSlice.actions;
export default mainItemsSlice.reducer;
