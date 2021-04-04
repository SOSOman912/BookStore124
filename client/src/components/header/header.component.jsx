import React from 'react'
import { connect } from 'react-redux';

import { auth } from '../../firebase/firebase.utils';
import { createStructuredSelector } from 'reselect';
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropDown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden,selectCurrentUser } from '../../redux/cart/cart.selectors';
import { LinkContainer, LOGO, LogoContainer,  HeaderContainer, OptionsContainer, OptionLink } from './header.styles.jsx'
import { togglecategoryhidden } from '../../redux/shop/shop.actions';
import CategoryDropDown  from '../category-dropdown/category-dropdown.component';
import { selectCategoryhidden } from '../../redux/shop/shop.selectors';
const Header = ({currentUser, hidden, shake,togglecategoryhidden, categoryhidden}) => {
	return(
		<HeaderContainer >
					<LogoContainer to='/'>
						<LOGO/>
					</LogoContainer>
					<OptionsContainer>
						<LinkContainer>	
							<OptionLink to='/shop'>
								CONTACT
							</OptionLink> 
							{
								currentUser?
								<OptionLink as='div' onClick={() => auth.signOut()}> SIGN OUT </OptionLink>
								:
								<OptionLink to='/signin'>SIGN IN</OptionLink>
							}
							</LinkContainer>
						<CartIcon/>
				
					</OptionsContainer>
					{
					   hidden ? null :
					<CartDropDown />
					}
					{
					   categoryhidden ? null :
					<CategoryDropDown/>
					}	
		</HeaderContainer>
	);
}

const mapStateToProps = createStructuredSelector({
	currentUser : selectCurrentUser,
	hidden: selectCartHidden,
	categoryhidden: selectCategoryhidden
});

const mapDispatchToProps = (dispatch) => ({
	togglecategoryhidden: () => dispatch(togglecategoryhidden())
})

export default connect(mapStateToProps,mapDispatchToProps)(Header);