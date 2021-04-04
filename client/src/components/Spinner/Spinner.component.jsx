import React from 'react'

import { SpinnerOverlay, SpinnerContainer } from './Spinner.styles'

const Spinner = Wrapped => ({ isLoading, ...otherProps}) =>  {
	return isLoading ? (
		<SpinnerOverlay>
			<SpinnerContainer />
		</SpinnerOverlay>
		) : (
		<Wrapped {...otherProps}  />
		);
};

export default Spinner;