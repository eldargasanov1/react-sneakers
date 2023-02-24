import { connect } from 'react-redux';
import { selectAllMainItems } from '@/redux/slices/allItems/mainItemsSlice';
import { Home } from '@/components/screens/Home';

const mapStateToProps = state => ({
	mainItems: selectAllMainItems(state),
	isMainItemsLoading: state.allItems.mainItems.isMainItemsLoading,
	searchValue: state.filters.searchValue,
});

export default connect(mapStateToProps)(Home);
