import React from 'react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'

import { selectCollectionForPreview } from '../../redux/shop/shop.selectors.js'
import { CollectionOverviewWrap } from './collections-overview.styles'
import CollectionPreview from '../preview-collection-component/preview-collection-component.jsx'

import CollectionItem from '../collectionItems/collectionItem.component.jsx'

const CollectionsOverview = ({ collections }) => {
	return(
	<CollectionOverviewWrap>
		{
		<CollectionPreview collections={collections} />	
		}
	</CollectionOverviewWrap>
	)
}

const mapStateToProps = createStructuredSelector({
	collections: selectCollectionForPreview 
})
 


export default connect(mapStateToProps)(CollectionsOverview);