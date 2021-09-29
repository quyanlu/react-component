import React, {useMemo, useState} from 'react';

function Message(props:any) {
	const {status, message, required, name, value, label, requiredMessage, validateTrigger} = props;
	const [infoMessage, setInfoMessage] = useState('');
	let showMessage = '';
	let color = '#FFFFFF';
	if (required && !value && status === 'reject') {
		showMessage = requiredMessage ? requiredMessage : `未输入${label}`;
		color = 'red';
	} else if (status === 'reject') {
		showMessage = message;
		color = 'red';
	} else if (status === 'pendding') {
		// @ts-ignore
		showMessage = null;
	} else if (status === 'resolve') {
		// @ts-ignore
		showMessage = null;
	}
	setTimeout(() => {
		if (showMessage?.includes('未输入')) {
			setInfoMessage(showMessage);
		} else {
			setInfoMessage('');
		}
	});
	const render = () => {
		return (
			<span style={{color}}>
				{' '}
				{showMessage}
			</span>
		);
	};
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const renderMessage = () => useMemo(render, [message, infoMessage]);

	return <div className="form-message">{validateTrigger === 'onKeyUp' ? renderMessage() : render()}</div>;
}
export {Message};
