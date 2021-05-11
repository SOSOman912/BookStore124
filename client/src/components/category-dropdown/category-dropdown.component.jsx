import React from 'react';
import { connect } from 'react-redux';
import { selectCollectionForPreview } from '../../redux/shop/shop.selectors.js';
import { createStructuredSelector } from 'reselect';
import {Category,
		CategoryTitle,
		ARROW,
		CategoryItemBox
		} from './category-dropdown.styles.jsx'

const CategoryDropDown = ({Collections}) => {
	return(
		<Category>
			 	<CategoryItemBox>
	 				<CategoryTitle className='Item'>User Portfolio</CategoryTitle>
	 				<ARROW />
	 			</CategoryItemBox>
	 			<CategoryItemBox>
	 				<CategoryTitle className='Item'>Sign Out</CategoryTitle>
	 				<ARROW />
	 			</CategoryItemBox>
		</Category>
	)
}

const mapStateToProps = createStructuredSelector({
	Collections: selectCollectionForPreview
})

export default connect(mapStateToProps)(CategoryDropDown);