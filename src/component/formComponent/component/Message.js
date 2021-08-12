import React from 'react';
import './style.scss';

function Message(props) {
	console.log(props)
	const {status, message, required, name, value,label} = props;
	let showMessage = '';
	let color = '#FFFFFF';
	if (required && !value && status === 'reject') {
		showMessage = `${label} 为必填项`;
		color = 'red';
	} else if (status === 'reject') {
		showMessage = message;
		color = 'red';
	} else if (status === 'pendding') {
		showMessage = null;
	} else if (status === 'resolve') {
		showMessage = '校验通过';
		color = 'green';
	}
	return <div className="from-message">
		<span style={{color}}>{showMessage}</span>
	</div>;
}
export default Message;
