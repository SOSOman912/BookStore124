import React from 'react';
import { connect } from 'react-redux';
import { selectCollectionForPreview } from '../../redux/shop/shop.selectors.js';
import { createStructuredSelector } from 'reselect';
import CollectionsOverview from '../../components/collections-overview/collections-overview.components.jsx'

import { HomePageContainer,
		 FirstSection,
		 PosterContainer
 							} from './homepage.styles';

const Homepage = ({Collections}) => {
	return(
	<HomePageContainer>
		<FirstSection>
			 <PosterContainer/>
		</FirstSection>
		<CollectionsOverview  />
	</HomePageContainer>
		)
}

const mapStateToProps = createStructuredSelector({
	Collections: selectCollectionForPreview
})

export default connect(mapStateToProps)(Homepage);