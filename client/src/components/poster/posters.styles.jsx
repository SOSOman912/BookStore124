import styled from 'styled-components';

export const PosterWrapper = styled.div`
	width:1525px;
	height:700px;
	position:relative;
`

export const Image = styled.img`
	width:100%;
	height:100%;
	object-fit:cover;
	position:absolute;
`

export const CircleSelector = styled.div`
	border:none;
	background-color:black;
	width:10px;
	height:10px;
	border-radius:50%;

	&:hover{
		background-color:white;
	}
`

export const CircleSelectorContainer = styled.div`
	bottom:0.5%;
	left:50%;
	transform:translate(-50%);
	position:absolute;
	width:42px;
	display:flex;
	justify-content:space-between;
	align-items:center;
`