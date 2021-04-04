import React from 'react';

import { CartItemWrap , ImgWrap, ItemDetail, Name } from './cart-item.styles.jsx'

const CartItem = ({item: { small_image_url, sale_price, original_title, quantity}}) => {
	return(
	<CartItemWrap className='cart-item'>
		<ImgWrap src={small_image_url} alt='item' />
		<ItemDetail className='item-details' >
			<Name className='name'>{original_title}</Name>
			<span className='price'>
				{quantity} X ${sale_price}
			</span>
		</ItemDetail>
	</CartItemWrap>
	)
}

export default CartItem;