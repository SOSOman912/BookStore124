import styled, {keyframes} from 'styled-components';

const fadeIn = keyframes`
	0% {
		opacity:0;
	}
	100% {
		opacity:1;
	}
`

export const SearchBarWrapper = styled.div`
	text-align:center;
	padding:2% 5%;
`

export const FilteringTitleWrapper = styled.div`
	width:100%;
	height:100%;
	display:flex;
	justify-content:space-between;
	align-item:center;
	cursor:pointer;
`

export const FilteringItem = styled.div`
	width:100%;
	height:100%;
	border-bottom:1px solid rgba(0,0,0,0.7);
`

export const FilteringTitle = styled.h1`
	font-weight:300;
	font-size:24px;
`

export const SearchingInput = styled.input`
	margin:20px 0;
	width:100%;
	height:30px;
	border:1px solid black;
	border-radius:5%;
	animation: ${fadeIn} 0.25s ease-in;
	font-size:20px;
`