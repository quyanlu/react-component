import React, {cloneElement, isValidElement, useContext, useEffect, useMemo, useState} from 'react';
import FormContext from './FormContext';
import {Label} from './Label';
import {Message} from './Message';

function FormItem(props: any) {
	const {name, children, label, height = 50, labelWidth, required = false, rules = {}, trigger = 'onChange', validateTrigger = 'onChange', className = '', requiredMessage} = props;
	const formInstance = useContext(FormContext);
	const {registerValidateFields, dispatch, unRegisterValidate} = formInstance as any;
	const [, forceUpdate] = useState({});
	const onStoreChange = useMemo(() => {
		const onstoreChange = {
			changeValue() {
				forceUpdate({});
			},
		};
		return onstoreChange;
	}, [formInstance]);

	useEffect(() => {
		name && registerValidateFields(name, onStoreChange, {rules, required});
		return function() {
			name && unRegisterValidate(name);
		};
	}, [onStoreChange]);

	const getControlled = (child: any) => {
		const mergeChildrenProps = {...child.props};
		if (!name) return mergeChildrenProps;
		const handleChange = (e: any) => {
			const value = e.target.value;
			dispatch({type: 'setFieldsValue'}, name, value);
		};
		mergeChildrenProps[trigger] = handleChange;
		if (required || rules) {
			mergeChildrenProps[validateTrigger] = (e: any) => {
				if (validateTrigger === trigger) {
					handleChange(e);
				}
				dispatch({type: 'validateFieldValue'}, name);
			};
		}
		mergeChildrenProps.value = dispatch({type: 'getFieldValue'}, name) || '';
		return mergeChildrenProps;
	};
	let renderChildren;
	if (isValidElement(children)) {
		renderChildren = cloneElement(children, getControlled(children));
	} else {
		renderChildren = children;
	}
	return (
		<Label height={height} label={label} labelWidth={labelWidth} required={required} className={className}>
			{renderChildren}
			<Message name={name} label={label} validateTrigger={validateTrigger} requiredMessage={requiredMessage} {...dispatch({type: 'getFieldModel'}, name)} />
		</Label>
	);
}
export default FormItem;
