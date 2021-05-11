import React from 'react';
import { connect } from 'react-redux';
import { selectCollectionForPreview,selectRecommendationlist } from '../../redux/shop/shop.selectors.js';
import { createStructuredSelector } from 'reselect';
import CollectionsOverview from '../../components/collections-overview/collections-overview.components.jsx'
import CollaborativeFilterPreview from '../../components/collaborative-filter-preview/collaborative-filter-preview.component'
import {selectCurrentUser} from '../../redux/cart/cart.selectors.js' 

import { HomePageContainer,
		 PosterContainer,
		 SecondSection
 							} from './homepage.styles';

const Homepage = ({Collections,CurrentUser,Recommendationlist}) => {
	return(
	<HomePageContainer>
		<SecondSection>
			 <PosterContainer/>
		</SecondSection>
		{	Recommendationlist ? 
				<CollaborativeFilterPreview />
			: null
		}
			
		<CollectionsOverview  />
	</HomePageContainer>
		)
}

const mapStateToProps = createStructuredSelector({
	Collections: selectCollectionForPreview,
	CurrentUser: selectCurrentUser,
	Recommendationlist: selectRecommendationlist
})

export default connect(mapStateToProps)(Homepage);