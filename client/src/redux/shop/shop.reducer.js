import shopActionType  from './shop.types'

const INITIAL_STATE = {
	collections: null,
	isFetching: true,
	errorMessage: undefined,
	ElaboratedItems: '',
	hidden: true,
	PosterToshow: 1,
	Categoryhidden: true,
	LoginMessagehidden: true,
	recommendationList: [],
	isAnalyzing: true,
	AnalyzingerrorMessage: undefined
}

const shopReducer = ( state = INITIAL_STATE, action) => {
	switch(action.type) {
		case shopActionType.ADD_ELABORATED_ITEM:
			return {
				...state,
				ElaboratedItems: action.payload,
				hidden: !state.hidden
			}
		case shopActionType.REMOVE_ELABORATED_ITEM:
			return {
				...state,
				ElaboratedItems: '',
				hidden: !state.hidden
			}
		case shopActionType.FETCH_COLLECTIONS_START:
			return {
				...state,
				isFetching: true
			}
		case shopActionType.FETCH_COLLECTIONS_SUCCESS:
			return {
				...state,
				isFetching:false,
				collections: action.payload
			}
		case shopActionType.FETCH_COLLECTIONS_FAILURE:
			return {
				...state,
				isFetching:false,
				errorMessage: action.payload
			}
		case shopActionType.COLLABORATIVE_FILTER_START:
			return {
				...state,
				isAnalyzing: true
			}
		case shopActionType.COLLABORATIVE_FILTER_SUCCESS:
			return {
				...state,
				isAnalyzing:false,
				recommendationList: action.payload
			}
		case shopActionType.COLLABORATIVE_FILTER_FAILURE:
			return {
				...state,
				isAnalyzing:false,
				AnalyzingerrorMessage: action.payload
			}
		case shopActionType.UPDATE_COLLECTIONS:
			return {
				...state,
				collections: action.payload
			}
		case shopActionType.CHANGE_POSTER_TO_SHOW:
			return {
				...state,
				PosterToshow: action.payload
			}
		case shopActionType.TOGGLE_CATEGORY_HIDDEN:
			return {
				...state,
				Categoryhidden: !state.Categoryhidden
			}
		case shopActionType.TOGGLE_LOGININMESSAGE_HIDDEN:
			return {
				...state,
				LoginMessagehidden: !state.LoginMessagehidden
			}
		case shopActionType.SET_RECOMMENDATION_LIST:
			return {
				...state,
				recommendationList: action.payload
			}
		default:
			return state;
	}
}

export default shopReducer;