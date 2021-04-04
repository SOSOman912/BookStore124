import { connect } from 'react-redux';
import { createStructuredSelector} from 'reselect';
import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors';
import { compose } from 'redux';
import Spinner from '../Spinner/Spinner.component';
import CollectionsOverview from './collections-overview.components';

const mapStateToProps = createStructuredSelector({
	isLoading: selectIsCollectionFetching 
})

const CollectionsOverviewContainer = compose(
	connect(mapStateToProps),
	Spinner
	)(CollectionsOverview);

export default CollectionsOverviewContainer;