import React from 'react';

function Label(props) {
	const {children, label, labelWidth, required, height} = props;
	return (
		<div className="form-label"
			style={{height: height + 'px'}}
		>
			<div className="form-label-name"
				style={{width: `${labelWidth}px`}}
			>
				{required ? <span style={{color: 'red'}}>*</span> : null}
				{label}:
			</div>
			{children}
		</div>
	);
}
export default Label;
