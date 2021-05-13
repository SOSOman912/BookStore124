import shopActionType from './shop.types'

import {fetchingDataFromServer} from '../../pages/shop/shopData.fetching.js';

import {fetchingRecommendationListData} from './shop.utils.js';

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

export const collaborativefilterStart = () => ({
	type: shopActionType.COLLABORATIVE_FILTER_START
})

export const collaborativefilterSuccess = RecommendationList => ({
	type: shopActionType.COLLABORATIVE_FILTER_SUCCESS,
	payload: RecommendationList
})

export const collaborativefilterFailure = errorMessage => ({
	type: shopActionType.COLLABORATIVE_FILTER_FAILURE,
	payload: errorMessage
})

export const fetchCollectionsStartAsync = () => {
	return dispatch => {
		try {
		dispatch(fetchCollectionsStart());
		fetchingDataFromServer()
		.then((data) => dispatch(fetchCollectionsSuccess(data))
		);
		} catch (error) {
			dispatch(fetchCollectionsFailure(error.message));
		} 
	}
}

export const fetchRecommendationListAsync = (id) => {
	return dispatch => {
		try {
		dispatch(collaborativefilterStart());
		fetchingRecommendationListData(id)
		.then(data => dispatch(collaborativefilterSuccess(data))
		);
		} catch (error) {
			dispatch(collaborativefilterFailure(error.message));
		} 
	}
}

export const setRecommendationData = (data) => ({
	type: shopActionType.SET_RECOMMENDATION_LIST,
	payload: data
})

export const changePosterToShow = (number) => ({
	type:shopActionType.CHANGE_POSTER_TO_SHOW,
	payload: number
})

export const togglecategoryhidden = () => ({
	type:shopActionType.TOGGLE_CATEGORY_HIDDEN,
})

export const togglelogininmessagehidden = () => ({
	type:shopActionType.TOGGLE_LOGININMESSAGE_HIDDEN,
})