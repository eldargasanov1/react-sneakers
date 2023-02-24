import { connect } from 'react-redux';
import { setIsCartOpen } from '@/redux/slices/allItems/cartItemsSlice';
import { BackButton } from '../components/BackButton/BackButton';

const mapStateToProps = state => ({
	isCartOpen: state.allItems.cartItems.isCartOpen,
});
const mapDispatchToProps = dispatch => ({
	onClick: boolean => dispatch(setIsCartOpen({ isCartOpen: boolean })),
});

export default connect(mapStateToProps, mapDispatchToProps)(BackButton);
