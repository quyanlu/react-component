import React from 'react';

function Label(props:any) {
	const {children, label, labelWidth, required, height, className} = props;
	return (
		<div className={`form-label ${className}`} style={{height: `${height}px`}}>
			<div className="form-label-name" style={{width: `${labelWidth}px`}}>
				{label && required ? <span style={{color: '#E53935', marginRight: '5px', fontSize: '16px', verticalAlign: 'sub'}}>*</span> : null}
				{label}
				{label && ':'}
			</div>
			{children}
		</div>
	);
}
export {Label};
