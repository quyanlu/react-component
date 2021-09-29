import React from 'react';

// @ts-ignore
const Select = ({children, className = '', ...props}) => {
	return (
		<select {...props} className={`form-input ${className}`}>
			<option value={undefined}>{props.placeholder}</option>
			{children}
		</select>
	);
};

Select.Option = function (props:any) {
	return <option {...props} className="" label={props.children} />;
};
export {Select};
