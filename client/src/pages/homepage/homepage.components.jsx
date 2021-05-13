import React from 'react';
import { connect } from 'react-redux';
import { selectCollectionForPreview,selectRecommendationlist,selectIsAnalyzing } from '../../redux/shop/shop.selectors.js';
import { createStructuredSelector } from 'reselect';
import CollectionsOverview from '../../components/collections-overview/collections-overview.components.jsx'
import CollaborativeFilterPreview from '../../components/collaborative-filter-preview/collaborative-filter-preview.component'
import {selectCurrentUser} from '../../redux/cart/cart.selectors.js' 
import { BeatLoader } from 'react-spinners'

import { HomePageContainer,
		 PosterContainer,
		 SecondSection,
		 ThirdSection
 							} from './homepage.styles';

const Homepage = ({Collections,CurrentUser,Recommendationlist,IsAnalyzing}) => {
	return(
	<HomePageContainer>
		<SecondSection>
			 <PosterContainer/>
		</SecondSection>
		<ThirdSection>
		{	IsAnalyzing ?
				<BeatLoader loading />
			: <CollaborativeFilterPreview />
		}
		</ThirdSection>
		<CollectionsOverview  />
	</HomePageContainer>
		)
}

const mapStateToProps = createStructuredSelector({
	Collections: selectCollectionForPreview,
	CurrentUser: selectCurrentUser,
	Recommendationlist: selectRecommendationlist,
	IsAnalyzing:selectIsAnalyzing
})

export default connect(mapStateToProps)(Homepage);