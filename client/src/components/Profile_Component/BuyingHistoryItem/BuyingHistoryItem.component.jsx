import React from 'react';

import { BuyingHistoryItemContainer,
		 Title,
		 Data,
		 ContentContainer,
		 CheckoutHeaderWrap,
		 HeaderBlockWrap
		} from './BuyingHistoryItem.styles'

import BuyinghistoryDetail from './BuyinghistoryDetail.component';

const BuyingHistoryItem = ({cartItem}) => {
	const { id, customer_id, updated_at,created_at, items} = cartItem;
	return (
		<BuyingHistoryItemContainer>
			<ContentContainer>
				<Title>
					Order ID:
				</Title>
				<Data>
 					{id}
				</Data>
			</ContentContainer>
			<ContentContainer>
				<Title>
					Customer ID:
				</Title>
				<Data>
 					{customer_id}
				</Data>
			</ContentContainer>
			<ContentContainer>
				<Title>
					Order Created At:
				</Title>
				<Data>
 					{created_at}
				</Data>
			</ContentContainer>
			<ContentContainer>
				<Title>
					Update Date:
				</Title>
				<Data>
 					{updated_at}
				</Data>
			</ContentContainer>
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
			</CheckoutHeaderWrap>
				<BuyinghistoryDetail Item={items}/>

		</BuyingHistoryItemContainer>
		)
}

export default BuyingHistoryItem;