import FilteringActionType from './Filtering.types.js';
import { GoToNextPage , GoToPreviousPage } from './Filtering.utils.js'

const INITIAL_STATE = {
	searchField: '',
	SearchingBarHidden: false,
	currentPage: 1
}

const FilteringReducer = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case FilteringActionType.CHANGE_SEARCH_FIELD:
			return {
				...state,
				searchField:action.payload,
				currentPage: 1
			}
		case FilteringActionType.TOGGLE_SEARCH_BAR_HIDDEN:
			return {
				...state,
				SearchingBarHidden: !state.SearchingBarHidden
			}
		case FilteringActionType.NEXT_PAGE:
			return {
				...state,
				currentPage: GoToNextPage(action.payload,state.currentPage)
			}
		case FilteringActionType.PREVIOUS_PAGE:
			return {
				...state,
				currentPage: GoToPreviousPage(state.currentPage)		
					}
		default:
			return state;
	}
}

export default FilteringReducer;