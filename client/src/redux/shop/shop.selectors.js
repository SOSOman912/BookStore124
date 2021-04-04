import { createSelector } from 'reselect';

const selectshop = state => state.shop;

export const selectCollections = createSelector(
	[selectshop],
	shop => shop.collections
	)

export const selectCollectionForPreview = createSelector(
	[selectCollections],
	collections => collections ? Object.keys(collections).map(key => collections[key]) : []
	)

export const selectCollectionForFiltering = createSelector(
	[selectCollections],
	collections => collections ? collections : []
	)
 
export const selectDetailHidden = createSelector(
	[selectshop],
	shop => shop.hidden
	)

export const selectElaboratedItem = createSelector(
	[selectshop],
	shop => shop.ElaboratedItems
	)

export const selectCollection = collectionUrlParam => createSelector(
	[selectCollections],
	collections => collections ? collections[collectionUrlParam] : null
	)

export const selectIsCollectionFetching = createSelector(
	[selectshop],
	shop => shop.isFetching
	)

export const selectIscollectionLoaded = createSelector(
	[selectshop],
	shop => !!shop.collections
	)

export const selectPosterToShow = createSelector(
	[selectshop],
	shop => shop.PosterToshow
	)

export const selectCategoryhidden = createSelector(
	[selectshop],
	shop => shop.Categoryhidden
	)