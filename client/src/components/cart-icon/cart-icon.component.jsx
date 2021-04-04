import React from 'react';

import { connect } from 'react-redux';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors'

import { toggleCartHidden } from '../../redux/cart/cart.actions'

import { createStructuredSelector } from 'reselect'

import { CartIconWrap, ShoppingIconWrap, ItemCount } from './cart-icon.styles.jsx';

const CartIcon = ({ toggleCartHidden,itemCount }) => (
	<CartIconWrap >
		<ShoppingIconWrap onClick={toggleCartHidden} />
		<ItemCount>{itemCount}</ItemCount>
	</CartIconWrap>	
); 	 


const mapDispatchToProps = dispatch => ({
	toggleCartHidden: () => dispatch(toggleCartHidden())
})

const mapStateToProps = createStructuredSelector({
	itemCount: selectCartItemsCount,
})

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);