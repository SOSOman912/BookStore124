import React from 'react'

import { connect } from 'react-redux';

import { addItem } from '../../redux/cart/cart.actions';
	
import {addElaboratedItem, togglelogininmessagehidden} from '../../redux/shop/shop.actions.js'

import { createStructuredSelector } from 'reselect';

import { StarIconWrapper,OptionLink, ImageAndCustomButtonWrapper, CollectionItemWrap, Image, ButtonWrapper, CustomButtonWrap, CollectionFooter, Name, Price, StarRating } from './collectionItem.styles.jsx'

import {selectCurrentUser} from '../../redux/cart/cart.selectors'

import { withRouter } from 'react-router-dom'

function StarIcon(props) {
	  const { fill = 'none' } = props;
	  return (
	    <svg className="w-6 h-6" fill={fill} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
	  );
	}

function RatingIcon(props) {
	const {index, rating} = props;

	const fill = React.useMemo(() => {
		if (rating >= index) {
			return 'yellow'
		}
		return 'none';
	}, [rating,index]);

	return (
		<StarIconWrapper>
			<StarIcon fill={fill} />
		</StarIconWrapper>
		)
}

const CollectionItem =({ item, addItem, addElaboratedItem, CurrentUser,loginmessageHidden}) => {
	const { image_url, original_title, sale_price, average_rating, id } = item;

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
					<CustomButtonWrap inverted><OptionLink to={`/product/${id}`}>Detail</OptionLink></CustomButtonWrap>
					<CustomButtonWrap inverted onClick={() => CurrentUser? addItem(item) : loginmessageHidden()}> Add to cart</CustomButtonWrap>
				</ButtonWrapper>
			</ImageAndCustomButtonWrapper>
				<CollectionFooter>
						<Name className='name'>{original_title}</Name>
						<Price className='price'>${sale_price}</Price>
						<StarRating>
							{[1,2,3,4,5].map((index) => {
								return (
									<RatingIcon key={index} index={index} rating={average_rating} />
									)
							})}
						</StarRating>
				</CollectionFooter>
		</CollectionItemWrap>)
}

const mapStateToProps = createStructuredSelector({
	CurrentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
	addItem: item => dispatch(addItem(item)),
	addElaboratedItem: item => dispatch(addElaboratedItem(item)),
	loginmessageHidden: () => dispatch(togglelogininmessagehidden())
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(CollectionItem));