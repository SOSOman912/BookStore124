import shopActionType  from './shop.types'

const INITIAL_STATE = {
	collections: null,
	isFetching: false,
	errorMessage: undefined,
	ElaboratedItems: '',
	hidden: true,
	PosterToshow: 1,
	Categoryhidden: true
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
		default:
			return state;
	}
}

export default shopReducer;