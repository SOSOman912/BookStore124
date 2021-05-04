import React from 'react';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';
import { PortFolioPageContainer,
		 PortFolioContentContainer,
		 PortFolioContentBackground,
		 PortFolioContent,
		 FirstSection,
		 SecondSection,
		 Options,
		 Title
		} from './portfolio.styles.jsx'

const PortfolioPage = () => {
	return(
		<PortFolioPageContainer>
			<PortFolioContentContainer>
				<PortFolioContentBackground/>
				<h1>USER PROFILE</h1>
				<hr/>
				<PortFolioContent>
					<FirstSection>
						<Title>NAVIGATION</Title>
						<Options>
							USER INFORMATION
						</Options>
						<Options>
							BUYING HISTORY
						</Options>
						<Options>
							RATINGS
						</Options>
					</FirstSection>
					<SecondSection>

					</SecondSection>
				</PortFolioContent>
			</PortFolioContentContainer>
		</PortFolioPageContainer>
		)
}

const mapStateToProps = createStructuredSelector({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps,mapDispatchToProps)(PortfolioPage)