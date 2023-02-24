import { connect } from 'react-redux';
import { SearchInput } from '@/components/SearchInput/SearchInput';
import { setSearchValue } from '@/redux/slices/filtersSlice';

const mapStateToProps = state => ({
	searchValue: state.filters.searchValue,
});
const mapDispatchToProps = dispatch => ({
	onChange: value => dispatch(setSearchValue({ searchValue: value })),
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);
