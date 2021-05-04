import React from 'react';

import FormInput from '../form-input/form-input-component';

import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument, createUserProfileInDatabase, createUserProfileInDatabaseVerfied} from '../../firebase/firebase.utils';

import { SignUpWrap, SignUpTitle } from './sign-up.styles'

class SignUp extends React.Component {
	constructor() {
		super();

		this.state = {
			displayName: '',
			email: '',
			password: '',
			confirmPassword: ''
		}
	}

	handleSubmit = async event => {
		event.preventDefault();

		const { displayName, email, password, confirmPassword } = this.state;

		if(password !== confirmPassword) {
			alert("password don't match")
			return;
		}

		try {
			const { user } = await auth.createUserWithEmailAndPassword(email, password);
			console.log("---------------------------------");
			console.log(user);
			console.log(displayName);
			console.log("---------------------------------");

			createUserProfileInDatabaseVerfied(user, displayName);

			this.setState({
			displayName: '',
			email: '',
			password: '',
			confirmPassword: ''
		})

		}catch (error){
			console.error(error);
		}
	};

	handleChange = event => {
		const { name, value } = event.target;

		this.setState({[name]: value});
	}

	render() {
		const { displayName, email, password, confirmPassword } = this.state;
		return(
			<SignUpWrap className='sign-up'>
				<SignUpTitle className='title'>I do not have a ACCOUNT </SignUpTitle>
				<span>Sign Up with your email and password </span>
				<form className='sign-up-form' onSubmit={this.handleSubmit}>
					<FormInput 
					type='text' 
					name='displayName' 
					value={displayName}
					onChange={this.handleChange}
					label='Display Name'
					required
					/>
					<FormInput 
					type='email' 
					name='email' 
					value={email}
					onChange={this.handleChange}
					label='Email'
					required
					/>
					<FormInput 
					type='password' 
					name='password' 
					value={password}
					onChange={this.handleChange}
					label='Password'
					required
					/>
					<FormInput 
					type='password' 
					name='confirmPassword' 
					value={confirmPassword}
					onChange={this.handleChange}
					label='ConfirmPassword'
					required
					/>
					<CustomButton type='submit'>
						SIGN UP
					</CustomButton>
				</form>
			</SignUpWrap>
		)	;
	}
}

export default SignUp;