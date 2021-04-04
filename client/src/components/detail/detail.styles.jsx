import styled from 'styled-components'

export const DetailWrapper = styled.div`
	height:100%;
	width:100%;
	position:fixed;
	z-index: 6;
	visibility: visible;
`

export const Overlay = styled.div`
	height:100%;
	width:100%;
	cursor:pointer;
	position:fixed;
	background-color:black;
	opacity: 0.9;
	z-index: 7;
`

export const Colorbox = styled.div`
	height: 100%;
	width: 100%;
	display:flex;
	justify-content: center;
	align-items: center;
	z-index: 6;
`

export const Boxwrapper = styled.div`
	height:	640px;
	width: 900px;
	background-color:white;
	border-radius: 10px;
	z-index:8;
`

export const BoxContent = styled.div`
	height:100%;
	width:100%;
	display:flex;
	justify-content: center;
	align-items:center;
`

export const ContentLeft = styled.div`
	height:50%;
	width: 40%;
	margin:20px;
`

export const Image = styled.div`
	width:100%;
	height:100%;
	background-size:cover;
	background-position:center;
	margin:20px;
	border-radius: 5px;
	border: 2px solid grey;
`

export const ContentRight = styled.div`
	height:90%;
	width:45%;
	margin:20px;
`

export const Title = styled.div`
	font-size:30px;
	font-weight:bold;
	width:100%;
	height:10%;
`

export const Price = styled.div`
	padding:0.25em;
	color:red;
	background-color:#F8FFD6;
	font-size:40px;
	font-weight:bold;
	height:20%;
	width:100%;
`	