import React from 'react';
import { connect } from 'react-redux';
import { selectCollectionForPreview } from '../../redux/shop/shop.selectors.js';
import { createStructuredSelector } from 'reselect';
import {Category,
		CategoryBox,
		CategoryTitle,
		ARROW,
		CategoryItemBox
		} from './category-dropdown.styles.jsx'

const CategoryDropDown = ({Collections}) => {
	return(
		<Category>
			 	<CategoryBox>
			 		<CategoryTitle> Brand </CategoryTitle>
			 	</CategoryBox>
			 	{
			 		Collections.map(data => (
			 			<CategoryItemBox>
			 				<CategoryTitle className='Item'>{data.title}</CategoryTitle>
			 				<ARROW />
			 			</CategoryItemBox>
			 		))
			 	}
			 	<CategoryBox>
			 		<CategoryTitle> Gender </CategoryTitle>
			 	</CategoryBox>
			 	<CategoryItemBox>
	 				<CategoryTitle className='Item'>MALE</CategoryTitle>
	 				<ARROW />
	 			</CategoryItemBox>
	 			<CategoryItemBox>
	 				<CategoryTitle className='Item'>FEMALE</CategoryTitle>
	 				<ARROW />
	 			</CategoryItemBox>
	 			<CategoryBox>
			 		<CategoryTitle> Activities </CategoryTitle>
			 	</CategoryBox>
			 	<CategoryItemBox>
	 				<CategoryTitle className='Item'>STREET WALKING</CategoryTitle>
	 				<ARROW />
	 			</CategoryItemBox>
	 			<CategoryItemBox>
	 				<CategoryTitle className='Item'>FOOTBALL</CategoryTitle>
	 				<ARROW />
	 			</CategoryItemBox>
	 			<CategoryItemBox>
	 				<CategoryTitle className='Item'>BASKETBALL</CategoryTitle>
	 				<ARROW />
	 			</CategoryItemBox>
	 			<CategoryItemBox>
	 				<CategoryTitle className='Item'>RUNNING</CategoryTitle>
	 				<ARROW />
	 			</CategoryItemBox>
		</Category>
	)
}

const mapStateToProps = createStructuredSelector({
	Collections: selectCollectionForPreview
})

export default connect(mapStateToProps)(CategoryDropDown);