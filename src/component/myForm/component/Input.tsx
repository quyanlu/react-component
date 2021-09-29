import React from 'react';
import './component.scss';

const Input = (props:any) => {
	const {className, ...arg} = props;
	return <input className={`form-input ${className}`} {...arg} />;
};
export {Input};
