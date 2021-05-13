import styled, { css } from 'styled-components'

const buttonStyles = css`
 	background-color: black;
 	color:white;
  	border: none;

  	&:hover {
		background-color:white;
 		color:black;
 		border: 1px solid black;
  	}
`

const invertedButtonstyles = css`
	background-color:black;
	color:white;
	border: none;
	width:200px;

	&:hover {
		background-color:white;
		color:black;
		border: 1px solid black;

		a{
			color:black;
		}
	}
`

const googleSignInStyles = css`
	background-color: #4285f4;
	color:white;
	border: none;

	&:hover {
		background-color: #357ae8;
		border: none;
	}	 
`

const getButtonStyles = props => {
	if (props.isGoogleSignIn) {
		return googleSignInStyles;
	} 

	return props.inverted ? invertedButtonstyles : buttonStyles;
}

export const CustombuttonContainer = styled.button`
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  font-size: 15px;
  text-transform: uppercase;
  font-weight: bolder;
  cursor: pointer;
  display: flex;
  justify-content: center;

 	${getButtonStyles}
`
