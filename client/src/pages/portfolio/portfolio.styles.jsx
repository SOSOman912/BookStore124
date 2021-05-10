import styled from 'styled-components'

export const PortFolioPageContainer = styled.div`
	font-family: 'Noto Sans', sans-serif;
	width:1525px;
	height:100%;

	@media (max-width: 1920px) {
	  	width:1152px;
	  }

	@media (max-width: 1280px) {
	  	width:768px;
	}
`

export const PortFolioContentContainer = styled.div`
	height:70vh;
	position:relative;
	border-radius: 25px;
`

export const PortFolioContentBackground = styled.div`
	position:absolute;
	background-color:white;
`

export const PortFolioContent = styled.div`
	display:flex;
	justify-content:space-between;
`

export const FirstSection = styled.div`
	padding:0 2%;
	width:20%;
	height:100%;
	border:1px solid #8F8F8F;
`

export const SecondSection = styled.div`
	width:1067.5px;

	@media (max-width: 1920px) {
	  	width:806.4px;
	  }

	@media (max-width: 1280px) {
	  	width:537.6px;
	}


	height:100%;
`

export const Options = styled.div`
	font-family: 'Noto Sans', sans-serif;
	margin-bottom:40px;
	height:30px;
	cursor:pointer;
`

export const Title = styled.p`
	font-family: 'Noto Sans', sans-serif;
	line-height:1px;
	margin-bottom:40px;
	color:#8F8F8F;
	text-size:8px;
`