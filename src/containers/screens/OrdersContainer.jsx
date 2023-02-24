import { connect } from 'react-redux';
import { Orders } from '@/components/screens/Orders';
import { selectAllOrderItems } from '@/redux/slices/allItems/orderItemsSlice';

const mapStateToProps = state => ({
	orderItems: selectAllOrderItems(state),
	isOrderItemsLoading: state.allItems.mainItems.isMainItemsLoading,
	searchValue: state.filters.searchValue,
});

export default connect(mapStateToProps)(Orders);
