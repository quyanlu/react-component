import React from 'react';
import './component.scss';

const TextArea = (props: { [x: string]: any; className: any; }) => {
	const {className, ...arg} = props;
	return <textarea className={`form-textarea ${className}`} {...arg} />;
};
export {TextArea};
