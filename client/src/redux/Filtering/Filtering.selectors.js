import { createSelector } from 'reselect';

const selectFiltering = state => state.Filtering

export const selectSearchingBarHidden = createSelector(
	[selectFiltering],
	Filter => Filter.SearchingBarHidden
	)

export const selectSearchingField = createSelector(
	[selectFiltering],
	Filter => Filter.searchField
	)

export const selectCurrentPage = createSelector(
	[selectFiltering],
	Filter => Filter.currentPage
	)