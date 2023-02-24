import { connect } from 'react-redux';
import { removeFromCart } from '@/redux/slices/allItems/cartItemsSlice';
import { CartItem } from '@/components/CartItem/CartItem';

const mapStateToProps = (_, ownProps) => ({
	...ownProps,
});
const mapDispatchToProps = dispatch => ({
	onClick: (id, parentId) => dispatch(removeFromCart({ id, parentId })),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
