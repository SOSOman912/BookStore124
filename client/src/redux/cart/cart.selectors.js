import { createSelector } from 'reselect';

const selectCart = state => state.cart;

export const selectCartItems = createSelector(
	[selectCart],
	(cart) => cart.cartItems 
)	

export const selectCartHidden = createSelector(
	[selectCart],
	cart => cart.hidden
	)

export const selectCartItemsCount = createSelector(
	[selectCartItems],
		cartItems =>
			cartItems.reduce((accumaltedQuantity, cartItem) => accumaltedQuantity + cartItem.quantity, 0)
	)
export const selectCartTotal = createSelector(
	[selectCartItems],
		cartItems =>
			// cartItems.reduce((accumaltedQuantity, cartItem) => accumaltedQuantity * cartItem.price, 0)
			cartItems.reduce((accumaltedQuantity, cartItems) => accumaltedQuantity + cartItems.sale_price * cartItems.quantity, 0)
	)

export const selectCurrentUser = createSelector(
	[selectCart],
	cart => cart.currentUser
	)