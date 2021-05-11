import React from 'react';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { UserInformationContainer
		} from './Userinformation.styles.jsx';
		
import {selectCurrentUser} from '../../redux/cart/cart.selectors';
import BuyingHistoryItem from './BuyingHistoryItem/BuyingHistoryItem.component'
import {selectBuyingHistory} from '../../redux/Profile/Profile.selectors';


const BuyingHistory = ({CurrentUser,BuyingHistory,fetchBuyingHistoryStartAsync}) => {

	return (
		<UserInformationContainer>
			<h1>BUYING HISTORY</h1>
			{
				BuyingHistory.map(item => (
					<BuyingHistoryItem cartItem={item}/>
				))
			}
		
		</UserInformationContainer>
		)
}

const mapStateToProps = createStructuredSelector({
	CurrentUser: selectCurrentUser,
	BuyingHistory: selectBuyingHistory
});

const mapDispatchToProps = (dispatch) => ({
	
})

export default connect(mapStateToProps,mapDispatchToProps)(BuyingHistory);