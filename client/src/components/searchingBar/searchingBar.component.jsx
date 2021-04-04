import React from 'react';
import {connect} from 'react-redux';
import { SearchingInput,FilteringTitle, FilteringTitleWrapper, FilteringItem, SearchBarWrapper } from './searchingBar.styles.jsx'
import { createStructuredSelector } from 'reselect';
import {ChangeSearchField , ToggleSearchBarHidden} from '../../redux/Filtering/Filtering.actions.js'
import {selectSearchingBarHidden} from '../../redux/Filtering/Filtering.selectors.js'	

const SearchingBar = ({ChangeSearchField,SearchingBarHidden,ToggleSearchBarHidden}) => {
	return (
		<SearchBarWrapper>
			<FilteringItem>
				<FilteringTitleWrapper onClick={ToggleSearchBarHidden}>
					<FilteringTitle>Searching</FilteringTitle>
					<FilteringTitle>&#45;</FilteringTitle>
				</FilteringTitleWrapper>
				{	SearchingBarHidden ? null :
					<SearchingInput type='text' onChange={ChangeSearchField} />
				}
			</FilteringItem>
		</SearchBarWrapper>
		)
}

const mapStateToProps = createStructuredSelector({
	SearchingBarHidden: selectSearchingBarHidden
})

const mapDispatchToProps = (dispatch) => ({
	ChangeSearchField:event => dispatch(ChangeSearchField(event.target.value)),
	ToggleSearchBarHidden: () => dispatch(ToggleSearchBarHidden())

})

export default connect(mapStateToProps,mapDispatchToProps)(SearchingBar);