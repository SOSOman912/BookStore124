import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { selectIscollectionLoaded } from '../../redux/shop/shop.selectors';
import Spinner from '../../components/Spinner/Spinner.component.jsx';
import CategoryPage from './category.components.jsx';

const mapStateToProps = createStructuredSelector({
	isLoading: (state) => !selectIscollectionLoaded(state)
});

const CollectionPageContainer = compose(
	connect(mapStateToProps),
	Spinner
	)(CategoryPage);

export default CollectionPageContainer;