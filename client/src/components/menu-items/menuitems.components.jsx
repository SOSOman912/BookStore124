import React from 'react';
import { withRouter } from 'react-router-dom';

import {  MenuItemWrap , BackgroundImageWrap, ContentWrap, ContentTitle, ContentSubtitle } from './menuitems.styles'

const MenuItem = ({ title, imageUrl, size, history, linkUrl, match}) => {
	return(
	<MenuItemWrap className={`${size} menu-item`} onClick={() => console.log(history.push(`${match.url}${linkUrl}`))}>
		<BackgroundImageWrap 
			className='backgroundImageround-image' 
			style={{
			backgroundImage: `url(${imageUrl})`
		}}
		/>
		<ContentWrap >
			<ContentTitle >{title.toUpperCase()}</ContentTitle>
			<ContentSubtitle >SHOP NOW</ContentSubtitle>
		</ContentWrap>
	</MenuItemWrap>
		)
}

export default withRouter(MenuItem) ;