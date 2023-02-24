import { connect } from 'react-redux';
import {
	selectByIdCartItems,
	addToCart,
} from '@/redux/slices/allItems/cartItemsSlice';
import {
	selectByIdFavoriteItems,
	addToFavorites,
} from '@/redux/slices/allItems/favoriteItemsSlice';
import { CardItem } from '@/components/CardItem';

const mapStateToProps = (state, ownProps) => ({
	inCart: selectByIdCartItems(state, ownProps.parentId),
	inFavorites: selectByIdFavoriteItems(state, ownProps.parentId),
	...ownProps,
});
const mapDispatchToProps = dispatch => ({
	addToFavorites: (obj, inFavorites) =>
		dispatch(addToFavorites({ obj, inFavorites })),
	addToCart: (obj, inCart) => dispatch(addToCart({ obj, inCart })),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardItem);
