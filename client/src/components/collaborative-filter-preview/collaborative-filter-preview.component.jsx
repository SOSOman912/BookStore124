import React from 'react';
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from '../../redux/cart/cart.selectors'
import {	CollaborativeFilterPreviewWrap,
			FilterPreview
		} from './collaborative-filter-preview.styles'
import CollectionItem from '../collectionItems/collectionItem.component.jsx';

const CollaborativeFilterPreview = ({CurrentUser}) => {
	const { recommendationList } = CurrentUser;
	return (
		<CollaborativeFilterPreviewWrap>
					<h2>WE GUESS YOU MAY LIKE THESE BOOK:</h2>
					<hr/>
					<FilterPreview>
						{
						recommendationList.filter((item, idx) => idx < 4).map((item) => (
			 			<CollectionItem key={item.id} item = {item} />
			 			))
						}
					</FilterPreview>
					<hr/>
				</CollaborativeFilterPreviewWrap>
		)
}

const mapStateToProps = createStructuredSelector({
	CurrentUser:selectCurrentUser
})

export default connect(mapStateToProps)(CollaborativeFilterPreview);