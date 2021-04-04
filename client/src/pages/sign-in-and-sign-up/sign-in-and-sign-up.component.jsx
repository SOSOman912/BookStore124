import React from 'react';

import SignIn from '../../components/sign-in/sign-in-component';
import SignUp from '../../components/sign-up/sign-up.component';

import {SignInAndSignUp} from './sign-in-and-sign-up.styles.jsx';

const SignInAndSignUpPage = () => (
	<SignInAndSignUp >
		<SignIn />
		<SignUp />
	</SignInAndSignUp>
	);

export default SignInAndSignUpPage;