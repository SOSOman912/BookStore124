import React from 'react';

import { Group, FormInputWrap, FormInputLabel } from './form-input.styles'

const FormInput = ({ handleChange, label, ...otherProps}) => (
	<Group >
		<FormInputWrap className='form-input' onChange={handleChange} {...otherProps} />
		{
			label ? 
			(<FormInputLabel className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>
				{label}			
			</FormInputLabel>)
			: null
		}
	</Group>
);

export default FormInput;