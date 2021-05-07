import React from 'react';
import { connect } from 'react-redux';
import { selectCollectionForPreview } from '../../redux/shop/shop.selectors.js';
import { createStructuredSelector } from 'reselect';
import CollectionsOverview from '../../components/collections-overview/collections-overview.components.jsx'
import CollaborativeFilterPreview from '../../components/collaborative-filter-preview/collaborative-filter-preview.component'
import {selectCurrentUser} from '../../redux/cart/cart.selectors.js' 

import { HomePageContainer,
		 FirstSection,
		 PosterContainer,
		 SecondSection
 							} from './homepage.styles';

const Homepage = ({Collections,CurrentUser}) => {
	return(
	<HomePageContainer>
		<SecondSection>
			 <PosterContainer/>
		</SecondSection>
		{CurrentUser ?
			CurrentUser.recommendationList?
				<CollaborativeFilterPreview />
			:
				null
			:   
				null
		}
		<CollectionsOverview  />
	</HomePageContainer>
		)
}

const mapStateToProps = createStructuredSelector({
	Collections: selectCollectionForPreview,
	CurrentUser: selectCurrentUser
})

export default connect(mapStateToProps)(Homepage);