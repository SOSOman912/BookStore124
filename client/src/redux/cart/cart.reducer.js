import CartActionTypes from './cart.types';
import { addItemToCart, removeItemFromCart,clearItemFromCart,checkingCartList } from './cart.utils';	

const INITIAL_STATE = {
	hidden : true,	
	cartItems : [],
	currentUser: null
}

const cartReducer = ( state = INITIAL_STATE, action) => {
	switch (action.type) {
		case CartActionTypes.TOGGLE_CART_HIDDEN:
			return{
			...state,
			hidden: !state.hidden
			};
		case CartActionTypes.ADD_ITEM:
			return{
			...state, 
			cartItems: addItemToCart(state, action.payload),
			};
		case CartActionTypes.CLEAR_ITEM_FROM_CART:
			return{
			...state,
			cartItems: clearItemFromCart(state, action.payload)
			}
		case CartActionTypes.REMOVE_ITEM:
			return{
			...state,
			cartItems: removeItemFromCart(state,action.payload)
			}
		case CartActionTypes.SET_CURRENT_USER:
			return {
				...state,
				currentUser: action.payload,
				cartItems: checkingCartList(action.payload)
			}
		default: 
			return state;
	}
}

export default cartReducer;
