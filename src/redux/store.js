import { combineReducers, configureStore } from '@reduxjs/toolkit';
import mainItemsReducer, {
	requestMainItems,
} from './slices/allItems/mainItemsSlice';
import cartItemsReducer, {
	requestCartItems,
} from './slices/allItems/cartItemsSlice';
import favoriteItemsReducer, {
	requestFavoriteItems,
} from './slices/allItems/favoriteItemsSlice';
import orderItemsReducer, {
	requestOrderItems,
} from './slices/allItems/orderItemsSlice';
import filtersReducer from './slices/filtersSlice';

export const requestAllItems = async dispatch => {
	await dispatch(requestCartItems());
	await dispatch(requestFavoriteItems());
	await dispatch(requestOrderItems());
	await dispatch(requestMainItems());
};

const allItemsReducer = combineReducers({
	mainItems: mainItemsReducer,
	cartItems: cartItemsReducer,
	favoriteItems: favoriteItemsReducer,
	orderItems: orderItemsReducer,
});

export const store = configureStore({
	reducer: {
		allItems: allItemsReducer,
		filters: filtersReducer,
	},
});
