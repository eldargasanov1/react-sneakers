import { OrderItem } from '@/components/OrderItem';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
	isOrderItemsLoading: state.allItems.mainItems.isMainItemsLoading,
});

export default connect(mapStateToProps)(OrderItem);
