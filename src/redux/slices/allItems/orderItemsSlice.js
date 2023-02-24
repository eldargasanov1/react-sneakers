import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';
import axios from '@/axios.js';
import {
	removeCartItems,
	selectAllCartItems,
	setTotalPrice,
} from './cartItemsSlice';

//===============================================

const orderItemsAdapter = createEntityAdapter({
	sortComparer: (a, b) => a.id - b.id,
});

const initialState = orderItemsAdapter.getInitialState({
	isOrderItemsLoading: true,
	isOrdered: false,
	error: null,
	status: '',
});

const orderItemsSelectors = orderItemsAdapter.getSelectors(
	state => state.allItems.orderItems
);

//===============================================

const requestOrderItems = createAsyncThunk(
	'orderItems/requestOrderItems',
	async (_, { dispatch, rejectWithValue }) => {
		try {
			const { data, statusText } = await axios.get('/orders');

			if (statusText !== 'OK') {
				throw new Error();
			}

			dispatch(setOrderItems(data));
		} catch (error) {
			return rejectWithValue({
				error: `${error.message}: Ошибка получение данных [orderItems]`,
			});
		}
	}
);

const addToOrders = createAsyncThunk(
	'orderItems/addToOrders',
	async (_, { dispatch, rejectWithValue, getState }) => {
		try {
			const { data, status } = await axios.post('/orders', {
				title: `Заказ от ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
				orderedCartItems: selectAllCartItems(getState()),
			});
			if (status >= 400) {
				throw new Error();
			}

			for await (let item of selectAllCartItems(getState())) {
				axios.delete(`/cart/${item.id}`);
			}

			dispatch(addOrderItem(data));
			dispatch(setIsOrdered({ isOrdered: true }));
			dispatch(removeCartItems());
			dispatch(setTotalPrice({ globalState: getState() }));
			setTimeout(() => {
				dispatch(setIsOrdered({ isOrdered: false }));
			}, 1500);
		} catch (error) {
			return rejectWithValue({
				error: `${error.message}: Ошибка получение данных [cartItems]`,
			});
		}
	}
);

//===============================================

const orderItemsSlice = createSlice({
	name: 'orderItems',
	initialState: initialState,
	reducers: {
		setOrderItems: orderItemsAdapter.upsertMany,
		addOrderItem: orderItemsAdapter.addOne,
		setIsOrdered(state, action) {
			state.isOrdered = action.payload.isOrdered;
		},
	},
	extraReducers: {
		[requestOrderItems.pending]: state => {
			state.error = null;
			state.isOrderItemsLoading = true;
			state.status = 'pending';
		},
		[requestOrderItems.fulfilled]: state => {
			state.isOrderItemsLoading = false;
			state.status = 'fulfilled';
		},
		[requestOrderItems.rejected]: (state, action) => {
			state.error = action.payload.error;
			state.isOrderItemsLoading = false;
			state.status = 'rejected';
		},
	},
});

//===============================================

export { requestOrderItems, addToOrders };
export const {
	selectById: selectByIdOrderItems,
	selectIds: selectIdsOrderItems,
	selectEntities: selectEntitiesOrderItems,
	selectAll: selectAllOrderItems,
	selectTotal: selectTotalOrderItems,
} = orderItemsSelectors;
export const { setOrderItems, addOrderItem, setIsOrdered } =
	orderItemsSlice.actions;
export default orderItemsSlice.reducer;
