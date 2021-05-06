import styled from 'styled-components';


export const DetailWrapper = styled.div`
	position:relative;
	height:100%;
	width:100%;
	z-index: 6;
	visibility: visible;
`

export const Overlay = styled.div`
	position:absolute;
	height:100%;
	width:100%;
	cursor:pointer;
	position:fixed;
	background-color:black;
	opacity: 0.9;
	z-index: 7;
`

export const Colorbox = styled.div`
	position:absolute;
	height: 100vh;
	width: 100vw;
	display:flex;
	justify-content: center;
	align-items: center;
	z-index: 8;
`

export const Boxwrapper = styled.div`
	position:fixed;
	height:	200px;
	width: 500px;
	background-color:white;
	border-radius: 10px;
	z-index:8;
	padding:12px;
	display:flex;
	flex-direction:column;
	justify-content:center;
	align-items:center;
`

export const Button = styled.div`
	width:100px;
	height:30px;
	background-color:#36eb72;
	display:flex;
	justify-content:center;
	align-items:center;
	border-radius:5px;
	cursor:pointer;
`

export const Content = styled.p`
	font-size:16px;
	color:black;
`

export const BoxContent = styled.div`
	height:100%;
	width:100%;
	display:flex;
	justify-content: center;
	align-items:center;
`