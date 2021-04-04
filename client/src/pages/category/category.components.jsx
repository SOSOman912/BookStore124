import React from 'react';

import { connect } from 'react-redux';

import CollectionItem from '../../components/collectionItems/collectionItem.component'

import { selectCollection } from '../../redux/shop/shop.selectors'

import { CollectionPageWrap , CollectionWrap, CollectionItemsWrap } from './category.styles.jsx' 

const CategoryPage = ({ collection }) => {
	// const { title , items } = collection; 
	return (
	<CollectionPageWrap >
{/*		<CollectionWrap > {title} </CollectionWrap>
		<CollectionItemsWrap >
			{
				items.map(item => <CollectionItem key={item.id} item={item} />)
			}
		</CollectionItemsWrap>*/}
	</CollectionPageWrap>	
);};

const mapStateToProps = (state, ownProps) =>  ({
	collection: selectCollection(ownProps.match.params.categoryId)(state)
})

 
export default connect(mapStateToProps)(CategoryPage); 