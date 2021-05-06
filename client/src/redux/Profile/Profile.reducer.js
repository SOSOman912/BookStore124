import ProfileActionType  from './Profile.types'

const INITIAL_STATE = {
	BuyingHistoryHidden:true,
	ProductToRatingsHidden:true,
	UserinformationHidden:false,
	BuyingHistory: []
}

const ProfileReducer = ( state = INITIAL_STATE, action) => {
	switch(action.type){
		case ProfileActionType.TOGGLE_USERINFORMATION_HIDDEN:
			return {
				...state,
				BuyingHistoryHidden:true,
				ProductToRatingsHidden:true,
				UserinformationHidden:false
			}
		case ProfileActionType.TOGGLE_BUYINGHISTORY_HIDDEN:
			return {
				...state,
				BuyingHistoryHidden:false,
				ProductToRatingsHidden:true,
				UserinformationHidden:true
			}
		case ProfileActionType.TOGGLE_RATINGS_HIDDEN:
			return {
				...state,
				BuyingHistoryHidden:true,
				ProductToRatingsHidden:false,
				UserinformationHidden:true
			}
		case ProfileActionType.SET_BUYINGHISTORY_DATA:
			return {
				...state,
				BuyingHistory: action.payload
			}
		default:
			return state;
	}
}

export default ProfileReducer;