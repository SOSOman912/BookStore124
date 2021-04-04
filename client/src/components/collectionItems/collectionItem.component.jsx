import React from 'react'

import { connect } from 'react-redux';

import { addItem } from '../../redux/cart/cart.actions';
	
import {addElaboratedItem} from '../../redux/shop/shop.actions.js'

import { ImageAndCustomButtonWrapper, CollectionItemWrap, Image, ButtonWrapper, CustomButtonWrap, CollectionFooter, Name, Price } from './collectionItem.styles.jsx'


const CollectionItem =({ item, addItem, addElaboratedItem}) => {
	const { authors , image_url, original_title } = item;

	return (
		<CollectionItemWrap >
			<ImageAndCustomButtonWrapper>
				<Image
					className='image'
					style={{
				 		backgroundImage: `url(${image_url})`
					 }}
				 />	
				 <ButtonWrapper>
					<CustomButtonWrap inverted onClick={() => addElaboratedItem(item)}> Detail </CustomButtonWrap>
					<CustomButtonWrap inverted onClick={() => addItem(item)}> Add to cart</CustomButtonWrap>
				</ButtonWrapper>
			</ImageAndCustomButtonWrapper>
				<CollectionFooter>
						<Name className='name'>{original_title}</Name>
						<Name className='author'><b>Author:</b> {authors}</Name>
			{/*			<Price className='price'>${sale_price}</Price>*/}
				</CollectionFooter>
		</CollectionItemWrap>)
}

const mapDispatchToProps = dispatch => ({
	addItem: item => dispatch(addItem(item)),
	addElaboratedItem: item => dispatch(addElaboratedItem(item))
})

export default connect( null , mapDispatchToProps)(CollectionItem);