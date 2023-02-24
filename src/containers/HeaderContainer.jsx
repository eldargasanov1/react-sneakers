import { connect } from 'react-redux';
import { setIsCartOpen } from '@/redux/slices/allItems/cartItemsSlice';
import { Header } from '@/components/Header';

const mapStateToProps = state => ({
	totalPrice: state.allItems.cartItems.totalPrice,
});
const mapDispatchToProps = dispatch => ({
	onClick: boolean => dispatch(setIsCartOpen({ isCartOpen: boolean })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
