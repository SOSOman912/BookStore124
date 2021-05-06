import React from 'react';

import { ItemContainer,
		 ImgWrap,
		 HeaderBlockWrap,
		 ImageContainer
		} from './BuyinghistoryDetail.styles.jsx'

const BuyinghistoryDetail = ({Item}) => {
	const {small_image_url,title,quantity,sale_price} = Item
	return (
		<ItemContainer>
			<ImageContainer>
				<ImgWrap src={small_image_url} alt='item' />
			</ImageContainer>
			<HeaderBlockWrap>
				{title}
			</HeaderBlockWrap>
			<HeaderBlockWrap>
				{quantity}
			</HeaderBlockWrap>
			<HeaderBlockWrap>
				{sale_price}
			</HeaderBlockWrap>
		</ItemContainer>
		)
}

export default BuyinghistoryDetail;