import shopActionType from './shop.types'

import {fetchingDataFromServerforbasicUse,fetchingDataFromServer} from '../../pages/shop/shopData.fetching.js';

export const addElaboratedItem = (item) => ({
	type: shopActionType.ADD_ELABORATED_ITEM,
	payload: item
})

export const getElaboratedItem = () => ({
	type: shopActionType.GET_ELABORATED_ITEM
})

export const removeElaboratedItem = () => ({
	type: shopActionType.REMOVE_ELABORATED_ITEM
})

export const fetchCollectionsStart = () => ({
	type: shopActionType.FETCH_COLLECTIONS_START
})

export const fetchCollectionsSuccess = collectionMap => ({
	type: shopActionType.FETCH_COLLECTIONS_SUCCESS,
	payload: collectionMap
})

export const fetchCollectionsFailure = errorMessage => ({
	type: shopActionType.FETCH_COLLECTIONS_FAILURE,
	payload: errorMessage
})

export const fetchCollectionsStartAsync = () => {
	return dispatch => {
		try {
		dispatch(fetchCollectionsStart());
		const Basicdata = fetchingDataFromServer()
		.then((data) => dispatch(fetchCollectionsSuccess(data))
		);
		} catch (error) {
			dispatch(fetchCollectionsFailure(error.message));
		} 
	}
}

export const changePosterToShow = (number) => ({
	type:shopActionType.CHANGE_POSTER_TO_SHOW,
	payload: number
})

export const togglecategoryhidden = () => ({
	type:shopActionType.TOGGLE_CATEGORY_HIDDEN,
})

export const getrecommendationItems = () => ({
	type:shopActionType.GET_RECOMMENDATION_ITEMS,
})

