import React from 'react';
import { connect } from 'react-redux';
import {	BoxContainer,
			BoxWrapper,
			Hyperlink,
			Paragraph,
			Linkwrapper
		} from './Email.styles.jsx'

const EmailRegistrationPage = () => {
	return(
		<BoxContainer>
			<BoxWrapper>
				<Paragraph>
				Registration Email has been sended in to your register email
				</Paragraph>
				<Linkwrapper>
					<Hyperlink href={"http://localhost:3000"}>
					Back to HomePage
					</Hyperlink>
				</Linkwrapper>
			</BoxWrapper>
		</BoxContainer>
		)
}

export default EmailRegistrationPage;