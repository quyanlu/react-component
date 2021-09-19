import React from 'react';

function Input(props: { onChange?: any; value?: any; }) {
	console.log(props);
	const {onChange, value} = props;
	return <input className="input" onChange={(e) => (onChange && onChange(e.target.value))} value={value} />;
}
Input.displayName = 'input';
export default Input;
