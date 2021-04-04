import {ChatBotActionTypes} from './chatbot.types.js'

const INITIAL_STATE = {
	hidden: true,
	ButtonFadeInOut: true
}

const Chatbotreducer = (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case ChatBotActionTypes.TOGGLE_CHATBOT_HIDDEN:
			return {
				...state,
				hidden:!state.hidden
			};
		case ChatBotActionTypes.TOGGLE_BUTTON_FADEINOUT:
			return {
				...state,
				ButtonFadeInOut: !state.ButtonFadeInOut
			}
		default:
			return state;
	}
}

export default Chatbotreducer;