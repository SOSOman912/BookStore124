import styled, {css} from 'styled-components';

export const ImageContainer = styled.div`
    width: 25%;
`

export const Image = styled.img`
    height: 119px;	
`

export const ItemContainer = styled.div`
	padding:5px 20px;
	display:flex;
	height:129px;
`

export const HeaderBlockWrap= styled.span`
  width: 25%;
`

export const StarRating = styled.div`
	display:flex;
	width:70%;
	height:10px;
`

export const StarIconWrapper = styled.div`
	width:15px;
	height:150px;
`

export const RatingWrapper = styled.div`
	width:8%
	display:flex;
	flex-direction:column;
`

const beforeButtonStyle = css`
	background-color:#1C98FF;
	color:white;
`

const afterButtonStyle = css`
	background-color:grey;
	color:white;
`

const getButtonStyles = props => {
	return props.after ? afterButtonStyle : beforeButtonStyle;
}


export const SubmitButton = styled.div`
	cursor:pointer;
	margin-top:20px;
	display:flex;
	justify-content:center;
	align-items:center;
	border-radius:5px;
	width:70%;
	height:20px;
	font-size:12px;

		${getButtonStyles}
`

