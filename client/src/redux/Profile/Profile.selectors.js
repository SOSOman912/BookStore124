import { createSelector } from 'reselect';

const selectProfile = state => state.Profile;

export const selectBuyingHistoryHidden = createSelector(
	[selectProfile],
	Profile => Profile.BuyingHistoryHidden
	)

export const selectProductToRatingsHidden = createSelector(
	[selectProfile],
	Profile => Profile.ProductToRatingsHidden 
	)

export const selectUserinformationHidden = createSelector(
	[selectProfile],
	Profile => Profile.UserinformationHidden
	)

export const selectBuyingHistory = createSelector(
	[selectProfile],
	Profile => Profile.BuyingHistory
	)