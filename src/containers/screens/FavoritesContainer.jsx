import { connect } from 'react-redux';
import { selectAllFavoriteItems } from '@/redux/slices/allItems/favoriteItemsSlice';
import { Favorites } from '@/components/screens/Favorites';

const mapStateToProps = state => ({
	favoriteItems: selectAllFavoriteItems(state),
	isFavoriteItemsLoading: state.allItems.favoriteItems.isFavoriteItemsLoading,
	searchValue: state.filters.searchValue,
});

export default connect(mapStateToProps)(Favorites);
