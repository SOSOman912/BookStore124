import FilteringActionType from './Filtering.types.js';

export const ChangeSearchField = (value) => ({
	type: FilteringActionType.CHANGE_SEARCH_FIELD,
	payload: value	
})

export const ToggleSearchBarHidden = () => ({
	type: FilteringActionType.TOGGLE_SEARCH_BAR_HIDDEN
})

export const MoveToNextPage = (CollectionsToShow) => ({
	type: FilteringActionType.NEXT_PAGE,
	payload: CollectionsToShow
})

export const MoveToPreviousPage = (CollectionsToShow) => ({
	type: FilteringActionType.PREVIOUS_PAGE,
	payload: CollectionsToShow
})

