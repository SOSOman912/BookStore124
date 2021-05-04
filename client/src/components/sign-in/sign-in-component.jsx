import React from 'react';

import CustomButton from '../custom-button/custom-button.component';

import { auth, SignInWithGoogle } from '../../firebase/firebase.utils';

import FormInput from '../form-input/form-input-component';

import { SignInWrap, SignInTitle, ButtonsBarWrap ,WarningMessageWrap,WarningMessageBG, WarningMessageMG} from './sign-in.styles'

class SignIn extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			email: '',
			password: '',
			WarningMessage: ''
		}
	}

	handleSubmit = async event => {
		event.preventDefault();

		const { email, password } = this.state;

		try {
			var userPort = await auth.signInWithEmailAndPassword(email, password);
			console.log(userPort);
			this.setState({ email: '', password: '', WarningMessage:''});
		}catch (error) {
			if (error.code === "auth/user-not-found") {
			this.setState({ email: '', password: '', WarningMessage:"account don't exist"});
			}
		}
	}

	handleChange = (event) => {
		const { value, name } = event.target;

		this.setState({ [name]: value});
	}

	render() {
		return(
			<SignInWrap>
				<SignInTitle>I already have an account</SignInTitle>
				<span> Sign in with your email and password</span>

				<form onSubmit={this.handleSubmit}>
					<FormInput name='email' type="email" value={this.state.email} required label="email" handleChange={this.handleChange}/>
					<FormInput name='password' type="password" value={this.state.password} required label="password" handleChange={this.handleChange}/>
					<ButtonsBarWrap className='Button'>
						<CustomButton type="submit"> Sign in </CustomButton>
						<CustomButton onClick={SignInWithGoogle} isGoogleSignIn> SignInWithGoogle </CustomButton>
					</ButtonsBarWrap>
				{/*	<WarningMessageWrap>
						<WarningMessageBG/>
						<WarningMessageMG>WarningMessageWrap
						</WarningMessageMG>
					</WarningMessageWrap>*/}
				</form>
			</SignInWrap>
			)
	}
}

export default SignIn;