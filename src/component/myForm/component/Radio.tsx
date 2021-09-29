import React from 'react';

// @ts-ignore
const Radio = ({children, ...props}) => {
	const handleChange = (val: any) => {
		let obj = {};
		// @ts-ignore
		obj[props.name] = val;
		props.form.current.setFields(obj);
	};
	return (
		<label className="form-radio">
			<input {...props} type="radio" onChange={e => handleChange(e.target.value)} />
			{children}
		</label>
	);
};

export {Radio};
