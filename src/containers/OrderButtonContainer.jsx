import { connect } from 'react-redux';
import { addToOrders } from '@/redux/slices/allItems/orderItemsSlice';
import { OrderButton } from '@/components/OrderButton/OrderButton';

const mapDispatchToProps = dispatch => ({
	onClick: () => dispatch(addToOrders()),
});

export default connect(null, mapDispatchToProps)(OrderButton);
