import styled from 'styled-components'

export const CloseButton = styled.div`
	width:40px;
	height:40px;
	border: 1px solid black;
	border-radius: 50%;
	position:absolute;
	top:6.5%;
	left:-5%;
	z-index: 4;
	background-color:white;
	display:flex;
	justify-content:center;
	align-items:center;
	cursor:pointer;
`

export const ContentWrappeer = styled.div`
	bottom:0%;
	width:100%;
	height:90%;
	background-color:white;
	position:absolute;	
`

export const ChatBotContainer = styled.div`
	width:100%;
	height:100%;
	position:relative;
`
	
export const ChatBotWrapper = styled.div`
	right:0%;
	bottom: 5%;
	height:550px;
	width:350px;
	position:fixed;
	border:none;
`

export const ContentContainer = styled.div`
	height:90%;
	margin:31px;
	display:flex;
	flex-direction:column;
	justify-content:center;
	
`

export const ResultTableRow = styled.tr`
	width:100%;
	height:100%;
	display:table-row;
`

export const Result = styled.td`
	display:table-cell;
	width:99%;
	height:99%;
`

export const ResultWrapper = styled.table`
	height:95%;
	width:100%;
`

export const InputWrapper = styled.input`
	bottom:5%;
	left:50%;
	width:100%;
	height:5%;
	border-top: 0.5px solid gery;
`