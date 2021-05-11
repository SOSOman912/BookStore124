import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { selectCartItems, selectCartTotal} from '../../redux/cart/cart.selectors';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';

import { CheckoutPageWrap, CheckoutHeaderWrap, HeaderBlockWrap, TotalWrap } from './checkout.styles.jsx'

const checkoutPage = ({ cartItems, Total }) => (
	<CheckoutPageWrap >
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
				<span>Remove</span>
			</HeaderBlockWrap>
		</CheckoutHeaderWrap>
		{
			cartItems.map(cartItem => 
				<CheckoutItem key={cartItem.id} cartItem={cartItem} />
				)
		} 

		<TotalWrap >
			<span>TOTAL: ${Total}</span>
		</TotalWrap>
		<StripeCheckoutButton price={Total} CartList = {cartItems}/>
	</CheckoutPageWrap>
	) 

const mapStateToProps = createStructuredSelector({
	cartItems: selectCartItems,
	Total: selectCartTotal
})
export default connect(mapStateToProps)(checkoutPage);