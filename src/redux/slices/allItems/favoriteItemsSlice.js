import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';
import axios from '@/axios.js';

//===============================================

const favoriteItemsAdapter = createEntityAdapter({
	selectId: entity => entity.parentId,
	sortComparer: (a, b) => a.id - b.id,
});

const initialState = favoriteItemsAdapter.getInitialState({
	isFavoriteItemsLoading: true,
	error: null,
	status: '',
});

const favoriteItemsSelectors = favoriteItemsAdapter.getSelectors(
	state => state.allItems.favoriteItems
);

//===============================================

const requestFavoriteItems = createAsyncThunk(
	'favoriteItems/requestFavoriteItems',
	async (_, { dispatch, rejectWithValue }) => {
		try {
			const { data, statusText } = await axios.get('/favorites');

			if (statusText !== 'OK') {
				throw new Error();
			}

			dispatch(setFavoriteItems(data));
		} catch (error) {
			return rejectWithValue({
				error: `${error.message}: Ошибка получение данных [favoriteItems]`,
			});
		}
	}
);

const addToFavorites = createAsyncThunk(
	'favoriteItems/addToFavorites',
	async ({ obj, inFavorites }, { dispatch, rejectWithValue }) => {
		try {
			if (!inFavorites) {
				const { data, status } = await axios.post('/favorites', obj);
				if (status >= 400) {
					throw new Error();
				}

				dispatch(addFavoriteItem(data));
			} else {
				await axios.delete(`/favorites/${inFavorites.id}`);
				dispatch(removeFavoriteItem(inFavorites.parentId));
			}
		} catch (error) {
			return rejectWithValue({
				error: `${error.message}: Ошибка получение данных [favoriteItems]`,
			});
		}
	}
);

//===============================================

const favoriteItemsSlice = createSlice({
	name: 'favoriteItems',
	initialState: initialState,
	reducers: {
		setFavoriteItems: favoriteItemsAdapter.upsertMany,
		addFavoriteItem: favoriteItemsAdapter.addOne,
		removeFavoriteItem: favoriteItemsAdapter.removeOne,
	},
	extraReducers: {
		[requestFavoriteItems.pending]: state => {
			state.error = null;
			state.isFavoriteItemsLoading = true;
			state.status = 'pending';
		},
		[requestFavoriteItems.fulfilled]: state => {
			state.isFavoriteItemsLoading = false;
			state.status = 'fulfilled';
		},
		[requestFavoriteItems.rejected]: (state, action) => {
			state.error = action.payload.error;
			state.isFavoriteItemsLoading = false;
			state.status = 'rejected';
		},

		[addToFavorites.pending]: state => {
			state.error = null;
			state.status = 'pending';
		},
		[addToFavorites.fulfilled]: state => {
			state.status = 'fulfilled';
		},
		[addToFavorites.rejected]: (state, action) => {
			state.error = action.payload.error;
			state.status = 'rejected';
		},
	},
});

//===============================================

export { requestFavoriteItems, addToFavorites };
export const {
	selectById: selectByIdFavoriteItems,
	selectIds: selectIdsFavoriteItems,
	selectEntities: selectEntitiesFavoriteItems,
	selectAll: selectAllFavoriteItems,
	selectTotal: selectTotalFavoriteItems,
} = favoriteItemsSelectors;
export const { setFavoriteItems, addFavoriteItem, removeFavoriteItem } =
	favoriteItemsSlice.actions;
export default favoriteItemsSlice.reducer;
