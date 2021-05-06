import ProfileActionType from './Profile.types.js'

import {fetchingBuyingHistoryData} from './Profile.utils.js'

export const toggleUserInformationHidden = () => ({
	type: ProfileActionType.TOGGLE_USERINFORMATION_HIDDEN,
})

export const toggleBuyingHistoryHidden = () => ({
	type: ProfileActionType.TOGGLE_BUYINGHISTORY_HIDDEN,
})

export const toggleRatingsHidden= () => ({
	type: ProfileActionType.TOGGLE_RATINGS_HIDDEN,
})

export const setbuyinghistoryData = (data) => ({
	type: ProfileActionType.SET_BUYINGHISTORY_DATA,
	payload:data
})

export const fetchBuyingHistoryStartAsync = (id) => {
	return dispatch => {
		try {
		console.log("Start Fetching Buying History");
		const Basicdata = fetchingBuyingHistoryData(id)
		.then(data => dispatch(setbuyinghistoryData(data))
		);
		} catch (error) {
			console.log(error);
		} 
	}
}