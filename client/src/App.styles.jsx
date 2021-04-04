import styled from 'styled-components'

import { ReactComponent as chatBotIcon } from './assets/chatbot.svg'
import { ReactComponent as Arrow } from './assets/Antu_arrow-right.svg' 
import ChatBot from './components/chatBot/chatBot.components.jsx';

export const ContentContainer = styled.div`
	width:1525px;
	background-color:white;
	position:relative;
`

export const ChatBotBtn = styled(chatBotIcon)`
	width:60px;
	height:60px;
`

export const ChatBotContainer = styled(ChatBot)`
    width:100%;
    height:100%;
`



export const CategoryBox = styled.div`
    width:476px;
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
    width:448px;
    height:46px;
    border:none;
    border-bottom:1px solid rgba(255,255,255,0.2);
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:0 8%;
`

export const CategoryTitle = styled.h2`
    color:white;
    font-weight:400;
    font-size:18px;
`

export const Category = styled.div`
	position:absolute;
	left:485.5px;
	width:476px;
	height:100%;
	background-color:#82CBC8
`

export const ARROW = styled(Arrow)`
	width:20px;
    height:20px;
    color:white;
`