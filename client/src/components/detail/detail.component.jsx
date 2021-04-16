import React from 'react'

import { connect  } from 'react-redux'

import { createStructuredSelector } from 'reselect'

import { removeElaboratedItem } from '../../redux/shop/shop.actions'

import { selectElaboratedItem } from '../../redux/shop/shop.selectors'

import { Price,Title, DetailWrapper, Overlay, Colorbox, Boxwrapper,  BoxContent, ContentLeft, Image, ContentRight } from './detail.styles'

const DetailViewer = ({ElaboratedItem, removeElaboratedItem}) => {
	const { image_url, title, sale_price } =  ElaboratedItem;	
	console.log(ElaboratedItem);
	return(
	<DetailWrapper>	
		<Overlay onClick={()=>removeElaboratedItem()}></Overlay>
		<Colorbox >
				<Boxwrapper>
					<BoxContent>
						<ContentLeft>
							<Image 
							style = {{
								backgroundImage:`url(${image_url})`
							}}
							/>
						</ContentLeft>
						<ContentRight>
							<Title>{title}</Title>
							<Price>Price:${sale_price}</Price>
						</ContentRight>
					</BoxContent>
				</Boxwrapper>
			</Colorbox>	
	</DetailWrapper>
	)};

const mapStateToProps = createStructuredSelector({
	ElaboratedItem: selectElaboratedItem
})

const mapDispatchToProps = (dispatch) => ({
	removeElaboratedItem: () => dispatch(removeElaboratedItem())
})


export default connect(mapStateToProps,mapDispatchToProps)(DetailViewer);