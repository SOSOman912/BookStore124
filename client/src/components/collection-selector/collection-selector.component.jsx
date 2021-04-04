import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import { SelectorContainer , Arrow,  Value} from './collection-selector.styles.jsx'
import { MoveToNextPage , MoveToPreviousPage } from  '../../redux/Filtering/Filtering.actions.js'
import { selectCurrentPage } from '../../redux/Filtering/Filtering.selectors.js'

const CollectionSelector = ({CollectionsToShow, NextPage, CurrentPage,PreviousPage}) => {
	return(
		<SelectorContainer>
			<Arrow onClick={()=> PreviousPage()}>&#10094;</Arrow>
				<Value>{CurrentPage}</Value>
			<Arrow onClick={()=> NextPage(CollectionsToShow.length)}>&#10095;</Arrow>
		</SelectorContainer>
		) 
}

const mapStateToProps = createStructuredSelector({
	CurrentPage: selectCurrentPage
})

const mapDispatchToProps = Dispatch => ({
	NextPage:(CollectionsToShow) => Dispatch(MoveToNextPage(CollectionsToShow)),
	PreviousPage:() => Dispatch(MoveToPreviousPage())
})

export default connect(mapStateToProps,mapDispatchToProps)(CollectionSelector);