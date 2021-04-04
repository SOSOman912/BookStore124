import React from 'react';
import { connect } from 'react-redux';

import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
import {Content,ShopPageContainer,FirstSection, SecondSection, FilteringArea} from './shop.styles.jsx';
import CollectionFilterOverview from '../../components/Collections-Filter-Overview/Collections-Filter-Overview.component.jsx';


class ShopPage extends React.Component 
{	
	render() {
	return(	
		<ShopPageContainer>
			<h1>Filtered By</h1>
			<hr/>
			<Content>
				<FirstSection>
					<FilteringArea/>
				</FirstSection>
				<SecondSection>
					<CollectionFilterOverview/>
				</SecondSection>	
			</Content>
		</ShopPageContainer>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	fetchCollectionsStartAsync:  () => dispatch(fetchCollectionsStartAsync())
})

export default connect(null,mapDispatchToProps)(ShopPage);