import { connect } from 'react-redux';
import {
	selectAllCartItems,
	setIsCartOpen,
} from '@/redux/slices/allItems/cartItemsSlice';
import { Cart } from '@/components/Cart';

const mapStateToProps = state => ({
	cartItems: selectAllCartItems(state),
	isCartOpen: state.allItems.cartItems.isCartOpen,
	totalPrice: state.allItems.cartItems.totalPrice,
	isOrdered: state.allItems.orderItems.isOrdered,
});
const mapDispatchToProps = dispatch => ({
	onClick: boolean => dispatch(setIsCartOpen({ isCartOpen: boolean })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
