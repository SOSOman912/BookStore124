import React from 'react';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { CollectionSelectorContainer, CollectionFilteroverview, CollectionItemContainer } from './Collections-Filter-Overview.style.jsx'
import { selectCollectionForFiltering } from '../../redux/shop/shop.selectors.js'
import CollectionItem from '../collectionItems/collectionItem.component.jsx'
import { selectSearchingField , selectCurrentPage} from '../../redux/Filtering/Filtering.selectors.js'
import CollectionSelector from  '../collection-selector/collection-selector.component.jsx'

const CollectionFilterOverview = ({Collections,NameFilter,CurrentPage}) => {
	const CollectionsToShow = Collections.filter(item => item.title.toLowerCase().includes(NameFilter.toLowerCase()));
	return(
		<CollectionFilteroverview>
			<CollectionItemContainer>
				{	NameFilter ?
					CollectionsToShow.filter((item, idx) => idx >= 9*(CurrentPage-1) && idx < 9*CurrentPage).map((item) => (
						<CollectionItem key={item.id} item = {item} />
						))
					:
					CollectionsToShow.filter((item, idx) => idx >= 9*(CurrentPage-1) && idx < 9*CurrentPage).map((item) => (
						<CollectionItem key={item.id} item = {item} />
						))
				}
			</CollectionItemContainer>
			<CollectionSelectorContainer>
				<CollectionSelector CollectionsToShow={CollectionsToShow}/>
			</CollectionSelectorContainer>
		</CollectionFilteroverview>
		)
}

const mapStateToProps = createStructuredSelector({
	Collections:selectCollectionForFiltering,
	NameFilter: selectSearchingField,
	CurrentPage: selectCurrentPage
})

export default connect(mapStateToProps)(CollectionFilterOverview);