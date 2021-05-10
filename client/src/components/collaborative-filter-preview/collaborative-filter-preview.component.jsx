import React from 'react';
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect';
import {selectRecommendationlist} from '../../redux/shop/shop.selectors'
import {	CollaborativeFilterPreviewWrap,
			FilterPreview
		} from './collaborative-filter-preview.styles'
import CollectionItem from '../collectionItems/collectionItem.component.jsx';

const CollaborativeFilterPreview = ({Recommendationlist}) => {
	return (
		<CollaborativeFilterPreviewWrap>
					<h2>WE GUESS YOU MAY LIKE THESE BOOK:</h2>
					<hr/>
					<FilterPreview>
						{
						Recommendationlist.filter((item, idx) => idx < 4).map((item) => (
			 			<CollectionItem key={item.id} item = {item} />
			 			))
						}
					</FilterPreview>
					<hr/>
				</CollaborativeFilterPreviewWrap>
		)
}

const mapStateToProps = createStructuredSelector({
	Recommendationlist:selectRecommendationlist
})

export default connect(mapStateToProps)(CollaborativeFilterPreview);