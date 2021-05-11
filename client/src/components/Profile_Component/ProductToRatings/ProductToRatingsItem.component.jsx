import React from 'react';

import { ProductToRatingsItemContainer,
		 CheckoutHeaderWrap,
		 HeaderBlockWrap
		} from './ProductToRatingsItem.styles'

import ProductToRatingsDetail from './ProductToRatingsDetail.component';

const ProductToRatingsItem = ({cartItem}) => {
	const {items} = cartItem;
	return (
		<ProductToRatingsItemContainer>
			<CheckoutHeaderWrap >
				<HeaderBlockWrap >
					<span>Product</span>
				</HeaderBlockWrap>
				<HeaderBlockWrap >
					<span>Description</span>
				</HeaderBlockWrap>
				<HeaderBlockWrap >
					<span>Quantity</span>
				</HeaderBlockWrap>
				<HeaderBlockWrap >
					<span>Price</span>
				</HeaderBlockWrap>
				<HeaderBlockWrap >
					<span>Rate</span>
				</HeaderBlockWrap>
			</CheckoutHeaderWrap>
			{   
				items.map(item => (
					<ProductToRatingsDetail Item={item}/>
					))
			}
		</ProductToRatingsItemContainer>
		)
}

export default ProductToRatingsItem;