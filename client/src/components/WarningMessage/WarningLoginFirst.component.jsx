import React from 'react';
import {connect} from 'react-redux';
import { togglelogininmessagehidden } from '../../redux/shop/shop.actions'

import { DetailWrapper,
		 Overlay,
		 Colorbox,
		 Boxwrapper,
		 BoxContent,
		 Content,
		 Button
		} from './WarningLoginFirst.styles';

const WarningLoginFirst = ({LoginMessagehidden}) => {
	return (
	<DetailWrapper>
		<Overlay/>
		<Colorbox>
			<Boxwrapper>	
				<Content>
					Please login first
				</Content>	
				<Button onClick={() => LoginMessagehidden()}>
					Okay
				</Button>
			</Boxwrapper>
		</Colorbox>
	</DetailWrapper>
		)
}	

const mapDispatchToProps = (dispatch) => ({
	LoginMessagehidden: () => dispatch(togglelogininmessagehidden())
})


export default connect(null, mapDispatchToProps)(WarningLoginFirst);