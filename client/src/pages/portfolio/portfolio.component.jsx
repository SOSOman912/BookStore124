import React from 'react';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';
import UserInformation from '../../components/Profile_Component/Userinformation.component.jsx'
import ProductToRatings from '../../components/Profile_Component/ProductToRatings.component.jsx'
import BuyingHistory from '../../components/Profile_Component/BuyingHistory.component.jsx'
import {selectUserinformationHidden,selectBuyingHistoryHidden,selectProductToRatingsHidden} from '../../redux/Profile/Profile.selectors.js'
import {toggleUserInformationHidden,toggleBuyingHistoryHidden,toggleRatingsHidden} from '../../redux/Profile/Profile.actions.js'
import { selectCurrentUser } from '../../redux/cart/cart.selectors.js'

import { PortFolioPageContainer,
		 PortFolioContentContainer,
		 PortFolioContentBackground,
		 PortFolioContent,
		 FirstSection,
		 SecondSection,
		 Options,
		 Title
		} from './portfolio.styles.jsx'



class PortfolioPage extends React.Component {
	render() {
		const {UserInformationHidden,BuyingHistoryHidden,ProductsToRatingHidden,toggleUserInformationHidden,toggleBuyingHistoryHidden,toggleRatingsHidden} = this.props
		return(
		<PortFolioPageContainer>
			<PortFolioContentContainer>
				<PortFolioContentBackground/>
				<h1>USER PROFILE</h1>
				<hr/>
				<PortFolioContent>
					<FirstSection>
						<Title>NAVIGATION</Title>
						<Options onClick={() => toggleUserInformationHidden()}>
							USER INFORMATION
						</Options>
						<Options onClick={() => toggleBuyingHistoryHidden()}>
							BUYING HISTORY
						</Options>
						<Options onClick={() => toggleRatingsHidden()}>
							RATINGS
						</Options>
					</FirstSection>
					<SecondSection>
					{	
						UserInformationHidden ?
						null
						: <UserInformation/>
					}
					{	
						ProductsToRatingHidden ?
						null
						: <ProductToRatings/>
					}
					{	
						BuyingHistoryHidden ?
						null
						: <BuyingHistory/>
					}

					</SecondSection>
				</PortFolioContent>
			</PortFolioContentContainer>
		</PortFolioPageContainer>
		)
	}
} 


const mapStateToProps = createStructuredSelector({
	UserInformationHidden: selectUserinformationHidden,
	BuyingHistoryHidden: selectBuyingHistoryHidden,
	ProductsToRatingHidden: selectProductToRatingsHidden,
	CurrentUser: selectCurrentUser
});

const mapDispatchToProps = (dispatch) => ({
	toggleUserInformationHidden: () => dispatch(toggleUserInformationHidden()),
	toggleBuyingHistoryHidden: () => dispatch(toggleBuyingHistoryHidden()),
	toggleRatingsHidden: () => dispatch(toggleRatingsHidden()),
});

export default connect(mapStateToProps,mapDispatchToProps)(PortfolioPage)