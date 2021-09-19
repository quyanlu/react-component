import React, {cloneElement, isValidElement} from 'react';

function FormItem(props: any) {
	const {children, name, handleChange, value, label} = props;
	console.log(props);
	// @ts-ignore
	const onChange = (value) => {
		handleChange(name, value);
	};
	const {displayName} = children.type;
	// @ts-ignore
	return <div>
		<span>{label}:</span>
		{
			isValidElement(children) && displayName === 'input' ? cloneElement(children, {...{onChange, value}}) : value
		}
	</div>;
}
FormItem.dispalyName = 'formItem';
export default FormItem;
