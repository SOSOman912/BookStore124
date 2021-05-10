import styled from 'styled-components'
import Poster from '../../components/poster/poster.component.jsx'

export const HomePageContainer = styled.div`
	  background-color:#white;	  
	  width:1525px;

	  @media (max-width: 1920px) {
	  	width:1152px;
	  }

	  @media (max-width: 1280px) {
	  	width:1200px;
	  }
`

export const FirstSection = styled.div`
	width:100%;
	display:flex;
	justify-content:center;
`

export const SecondSection = styled.div`
	width:100%;
	display:flex;
	justify-content:center;
`

export const EmptyDiv = styled.div`
	width:488px;
	height:100%;
	background-color:white;
`

export const PosterContainer = styled(Poster)`
`
