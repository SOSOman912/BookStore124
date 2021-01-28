import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo  } from '../../assets/crown.svg';
import { ReactComponent as DropDownIcon  } from '../../assets/Hamburger_icon_white.svg' 

export const HeaderContainer = styled.div`
	background-color:#1A4354;
	height: 100px;
	width: 100%;
    border:none;
`

export const LogoContainer = styled(Link)`
    width:100%;
    height:50%;
`

export const LinkContainer = styled.div`
    display:flex;
    align-items:center;   
`

export const CategoryBox = styled.div`
    width:448px;
    height:46px;
    background-color:#EB525D;
    border:none;
    border-bottom:1px solid rgba(255,255,255,0.2);
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:0 5%;
    cursor:pointer;
`

export const CategoryTitle = styled.h2`
    color:white;
    font-weight:400;
    font-size:18px;
`


export const OptionsContainer = styled.div`
    width: 1525px;
    margin:0% 20%;
    display: flex;
    justify-content:space-between;

`

export const OptionLink = styled(Link)`
      cursor:pointer;
      color:white;
      padding:0px 20px;
`

export const LOGO = styled(Logo)`
    text-align:center;
    width:100%;
    height:50%;
`

export const DROPDOWNICON = styled(DropDownIcon)`
    width:20px;
    height:20px;
    color:white;
`