import React from 'react';
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect';
import {selectCollections, selectRecommendationlist} from '../../redux/shop/shop.selectors'
import {selectCurrentUser} from '../../redux/cart/cart.selectors'
import {	CollaborativeFilterPreviewWrap,
			FilterPreview
		} from './collaborative-filter-preview.styles'
import CollectionItem from '../collectionItems/collectionItem.component.jsx';

const CollaborativeFilterPreview = ({CurrentUser,Collections,Recommendationlist}) => {
	if (CurrentUser) {
		const {recommendionlist} = CurrentUser
		console.log("recommendationlist",recommendionlist);
		if (recommendionlist) {
				var realrecommendationlist = recommendionlist.filter((item, idx) => idx < 4).map((item) => {
							for ( var i = 0; i< Collections.length; i++ ) {
	          				if (item == Collections[i].id) {
	           				return {...Collections[i]}
	      				}
	               }
				}		 			
			)
		}else {
			realrecommendationlist = null;
		}
	} 

	return (
		<CollaborativeFilterPreviewWrap>
					<h2>WE GUESS YOU MAY LIKE THESE BOOK:</h2>
					<hr/>
					<FilterPreview>
					{ realrecommendationlist ? 
						realrecommendationlist.map((item) => (
						<CollectionItem item={item} />
							)) 
							: Recommendationlist ?
								Recommendationlist.filter((item, idx) => idx < 4).map((item) => (
									<CollectionItem item={item} />
									))
							:null
					}
					</FilterPreview>
					<hr/>
		</CollaborativeFilterPreviewWrap>
		)
}

const mapStateToProps = createStructuredSelector({
	CurrentUser:selectCurrentUser,
	Collections:selectCollections,
	Recommendationlist: selectRecommendationlist
})

export default connect(mapStateToProps)(CollaborativeFilterPreview);