import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';
import axios from '@/axios.js';

//===============================================

const cartItemsAdapter = createEntityAdapter({
	selectId: entity => entity.parentId,
	sortComparer: (a, b) => a.id - b.id,
});

const initialState = cartItemsAdapter.getInitialState({
	totalPrice: 0,
	isCartItemsLoading: true,
	isCartOpen: false,
	error: null,
	status: '',
});

const cartItemsSelectors = cartItemsAdapter.getSelectors(
	state => state.allItems.cartItems
);

//===============================================

const requestCartItems = createAsyncThunk(
	'cartItems/requestCartItems',
	async (_, { dispatch, rejectWithValue, getState }) => {
		try {
			const { data, statusText } = await axios.get('/cart');

			if (statusText !== 'OK') {
				throw new Error();
			}

			dispatch(setCartItems(data));
			dispatch(setTotalPrice({ globalState: getState() }));
		} catch (error) {
			return rejectWithValue({
				error: `${error.message}: Ошибка получение данных [cartItems]`,
			});
		}
	}
);

const addToCart = createAsyncThunk(
	'cartItems/addToCart',
	async ({ obj, inCart }, { dispatch, rejectWithValue, getState }) => {
		try {
			if (!inCart) {
				const { data, status } = await axios.post('/cart', obj);
				if (status >= 400) {
					throw new Error();
				}

				dispatch(addCartItem(data));
			} else {
				await axios.delete(`/cart/${inCart.id}`);
				dispatch(removeCartItem(inCart.parentId));
			}

			dispatch(setTotalPrice({ globalState: getState() }));
		} catch (error) {
			return rejectWithValue({
				error: `${error.message}: Ошибка получение данных [cartItems]`,
			});
		}
	}
);

const removeFromCart = createAsyncThunk(
	'cartItems/removeFromCart',
	async ({ id, parentId }, { dispatch, rejectWithValue, getState }) => {
		try {
			const { status } = await axios.delete(`/cart/${id}`);

			if (status >= 400) {
				throw new Error();
			}

			dispatch(removeCartItem(parentId));

			dispatch(setTotalPrice({ globalState: getState() }));
		} catch (error) {
			return rejectWithValue({
				error: `${error.message}: Ошибка удаления данных [cartItems]`,
			});
		}
	}
);

//===============================================

const cartItemsSlice = createSlice({
	name: 'cartItems',
	initialState: initialState,
	reducers: {
		setCartItems: cartItemsAdapter.upsertMany,
		addCartItem: cartItemsAdapter.addOne,
		removeCartItem: cartItemsAdapter.removeOne,
		removeCartItems: cartItemsAdapter.removeAll,
		setTotalPrice(state, action) {
			state.totalPrice = cartItemsSelectors
				.selectAll(action.payload.globalState)
				.reduce((accumulator, item) => accumulator + item.price, 0);
		},
		setIsCartOpen(state, action) {
			action.payload.isCartOpen
				? document.body.classList.add('lock')
				: document.body.classList.remove('lock');
			state.isCartOpen = action.payload.isCartOpen;
		},
	},
	extraReducers: {
		[requestCartItems.pending]: state => {
			state.error = null;
			state.isCartItemsLoading = true;
			state.status = 'pending';
		},
		[requestCartItems.fulfilled]: state => {
			state.isCartItemsLoading = false;
			state.status = 'fulfilled';
		},
		[requestCartItems.rejected]: (state, action) => {
			state.error = action.payload.error;
			state.isCartItemsLoading = false;
			state.status = 'rejected';
		},
	},
});

//===============================================

export { requestCartItems, addToCart, removeFromCart };
export const {
	selectById: selectByIdCartItems,
	selectIds: selectIdsCartItems,
	selectEntities: selectEntitiesCartItems,
	selectAll: selectAllCartItems,
	selectTotal: selectTotalCartItems,
} = cartItemsSelectors;
export const {
	setCartItems,
	addCartItem,
	removeCartItem,
	removeCartItems,
	setTotalPrice,
	setIsCartOpen,
} = cartItemsSlice.actions;
export default cartItemsSlice.reducer;
