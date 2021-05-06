import React from 'react';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { UserInformationContainer,
		 Title,
		 Data,
		 ContentContainer
		} from './Userinformation.styles.jsx';

import {selectCurrentUser} from '../../redux/cart/cart.selectors';

const UserInformation = ({CurrentUser}) => {
		const {email,id,username} = CurrentUser;
	return (
		<UserInformationContainer>
			<h1>USER INFORMATION</h1>
			<ContentContainer>
				<Title>UserName:</Title>
				<Data>{username}</Data>
			</ContentContainer>
			<ContentContainer>
				<Title>UserId:</Title>
				<Data>{id}</Data>
			</ContentContainer>
			<ContentContainer>
				<Title>Email:</Title>
				<Data>{email}</Data>
			</ContentContainer>
		</UserInformationContainer>
		)
}

const mapStateToProps = createStructuredSelector({
	CurrentUser: selectCurrentUser
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps,mapDispatchToProps)(UserInformation)