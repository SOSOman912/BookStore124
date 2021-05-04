import styled from 'styled-components';
import { ReactComponent as Arrow } from '../../assets/Antu_arrow-right.svg' 

export const CategoryBox = styled.div`
    width:238px;
    height:46px;
    background-color:#EB525D;
    border:none;
    border-bottom:1px solid rgba(255,255,255,0.2);
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:0 8%;
`

export const CategoryItemBox = styled.div`
    width:100%;
    height:30px;
    border:none;
    border-bottom:1px solid rgba(255,255,255,0.2);
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:0 8%;
    background-color:#DFDFDF;
`

export const CategoryTitle = styled.h2`
	text-align:center;
    color:white;
    font-weight:400;
    font-size:18px;

    &.Item {
    	color:grey;
    }
`

export const Category = styled.div`
	position:absolute;
	right:0%;
    top:99px;
	width:195px;
	height:60px;
	background-color:white;
    z-index:2;
`

export const ARROW = styled(Arrow)`
	width:20px;
    height:20px;
`