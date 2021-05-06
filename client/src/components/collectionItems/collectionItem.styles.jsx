import styled, {keyframes} from 'styled-components'

import CustomButton from '../custom-button/custom-button.component'

const fadingIn = keyframes`
	0% {
		display:none;
		opacity:0;
	}
	1% {
		display:flex;
		opaicty:0;
	}
	100% {
		display:flex;
		opacity:0.7;
	}
`

export const CollectionItemWrap = styled.div`
	margin:0% 10%;
	display:flex;
	flex-direction: column;
	width:150px;
	height: 250px;
	align-items:center;
	position:relative;
	margin-bottom: 50px;
	margin-top:10px;

	&:hover {
		.image {
			opacity: 0.1;
		}

		button{		
 			display:flex;
		}
	}
` 

export const ImageAndCustomButtonWrapper = styled.div`
	width:100%;
	height:80%;
	position:relative;
	margin-bottom:5px;
`

	export const Image = styled.div`
	width:100%;
	height:100%;
	background-size:cover;
	background-position:center;
	`

export const ButtonWrapper = styled.div`
	width:70%;
	top:50%;
	left:50%;
	transform:translate(-50%,-50%);
	display:flex;
	flex-direction: column;
	justify-content: center;
	align-items:center;
	position:absolute;
`

export const CustomButtonWrap = styled(CustomButton)`
	animation: ${fadingIn} 0.25s ease-in;
	margin:5px 0;
	width: 100%;
	opacity: 0.7;
	display:none;
`

export const CollectionFooter = styled.div`
	margin-top:5px;
	width: 100%;
	display:flex;
	flex-direction: column;
	font-size: 14px;

	.author {
		color:green;
	}
`

export const Name = styled.span`
	width: 100%;
	text-align:center;
`

export const Price = styled.span`
	max-width: 100%;
	width:15%;
	color:#de6666;
	font-weight: bold;
`

export const StarRating = styled.div`
	display:flex;
	width:100px;
	height:10px;
`

export const StarIconWrapper = styled.div`
	width:15px;
	height:150px;
`


