import React from 'react';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { UserInformationContainer,
		 ContentContainer,
		 CheckoutHeaderWrap,
		 HeaderBlockWrap,
		 BuyingHistoryItemContainer
		} from './Userinformation.styles.jsx';

import {selectCurrentUser} from '../../redux/cart/cart.selectors';
import {selectBuyingHistory} from '../../redux/Profile/Profile.selectors';

import ProductToRatingsItem from './ProductToRatings/ProductToRatingsItem.component'

import ProductToRatingsDetail from './ProductToRatings/ProductToRatingsDetail.component'

const ProductToRatings = ({CurrentUser,BuyingHistory,fetchBuyingHistoryStartAsync}) => {
	return (
		<UserInformationContainer>
			<h1>PRODUCT TO RATES</h1>
			<BuyingHistoryItemContainer>
			<CheckoutHeaderWrap >
				<HeaderBlockWrap >
					<span>Product</span>
				</HeaderBlockWrap>
				<HeaderBlockWrap >
					<span>Description</span>
				</HeaderBlockWrap>
				<HeaderBlockWrap >
					<span>Price</span>
				</HeaderBlockWrap>
				<HeaderBlockWrap >
					<span>Rate</span>
				</HeaderBlockWrap>
			</CheckoutHeaderWrap>
			{
				BuyingHistory.map(item => (
					item.items.map(data => (
						<ProductToRatingsDetail Item={data} />
						))
				))
			}
			</BuyingHistoryItemContainer>
		</UserInformationContainer>
	)
}

const mapStateToProps = createStructuredSelector({
	CurrentUser: selectCurrentUser,
	BuyingHistory: selectBuyingHistory
});

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps,mapDispatchToProps)(ProductToRatings);