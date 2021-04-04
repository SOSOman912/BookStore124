import { createSelector } from 'reselect';

const selectChatBot = state => state.chatBot;

export const selectChatBotHidden = createSelector(
	[selectChatBot],
	state => state.hidden
	)

export const selectButtonFadeInOut = createSelector(
	[selectChatBot],
	state => state.ButtonFadeInOut
	)