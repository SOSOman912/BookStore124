import styled from 'styled-components';
import CustomButton from '../../components/custom-button/custom-button.component'

export const ProductPageContainer = styled.div`
	font-family: 'Noto Sans', sans-serif;
	width:1152px;
	height:1300px;;
	display:flex;
	flex-direction: column;
`

export const FirstSection = styled.div`
	border:1px solid grey;
	padding:10px;
	display:flex;
	justify-content:space-between;
	width:100%;
	height:700px;
`

export const LeftSide = styled.div`
	width:456px; 
	height:100%;
	display:flex;
	flex-direction:column;
	align-items:center;
`

export const CustomButtonWrap = styled(CustomButton)`
	margin-top:50px;
	width: 100%;
	opacity: 0.7;
`

export const RightSide = styled.div`
	width:608px;
	height:100%;
	display:flex;
	flex-direction:column;

`

export const Image = styled.img`
	border:1px solid grey;
    width: 356px;
    height: 550px;	
`

export const Title = styled.h1`
	font-size:14px;
	line-height:0.5rem;
	color:black;
`

export const Content = styled.p`
	font-size:14px;
`

export const ContentDetail = styled.p`
	font-size:14px;
`


export const DetailWrap = styled.div`
	display:grid;
	grid-template-columns: 1fr 1fr ;
`

export const RatingWrap = styled.div`
	height:20px;
	width:50%;
	display:grid;
	grid-template-columns: 1fr 1fr;
	`

export const StarRating = styled.div`
	display:flex;
	width:100px;
	height:20px;
`

export const StarIconWrapper = styled.div`
	width:15px;
	height:20px;
`

export const RatingNumber = styled.div`
	font-size:14px;
	height:20px;
	display:flex;
	align-items:center;
`

export const FilterContentContainer = styled.div`
	border:1px solid gray;
	display:flex;
	justify-content:space-between;
	width:100%;
	height:400px;
`

export const FilterWrapper = styled.div`
	margin-top:50px;
	width:100%;
	height:400px;
`

export const FilterPreview = styled.div`
	width:1052px;
	display:flex;
	justify-content:center;
	align-items:center;
`

export const FirstPart = styled.div`
	width:100%;
	height:700px;
`

export const SecondPart = styled.div`
	width:100%;
	height:400px;
`	

export const ArrowButtonContainer = styled.div`
	height:100%;
`

export const ArrowButtonWrapper = styled.div`
    height:100%;
    display:flex;
    justify-content:center;
    align-items:center;

    &:hover {
    	opacity:0.5;
    }
`
