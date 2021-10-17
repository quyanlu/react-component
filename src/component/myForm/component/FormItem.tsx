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
		/* 管理层改变 => 通知表单项 */
		const onstoreChange = {
			changeValue() {
				forceUpdate({});
			},
		};
		return onstoreChange;
	}, [formInstance]);

	useEffect(() => {
		/* 注册表单 */
		name && registerValidateFields(name, onStoreChange, {rules, required});
		return function() {
			/* 卸载表单 */
			name && unRegisterValidate(name);
		};
	}, [onStoreChange]);
	/* 使表单控件变成可控制的 */
	const getControlled = (child: any) => {
		const mergeChildrenProps = {...child.props};
		if (!name) return mergeChildrenProps;
		const handleChange = (e: any) => {
			const value = e.target.value;
			dispatch({type: 'setFieldsValue'}, name, value);
		};
		mergeChildrenProps[trigger] = handleChange;
		if (required || rules) {
			/* 验证表单单元项的值 */
			mergeChildrenProps[validateTrigger] = (e: any) => {
				/* 当改变值和验证表单，用统一一个事件 */
				if (validateTrigger === trigger) {
					handleChange(e);
				}
				/* 触发表单验证 */
				dispatch({type: 'validateFieldValue'}, name);
			};
		}
		/* 获取 value */
		mergeChildrenProps.value = dispatch({type: 'getFieldValue'}, name) || '';
		return mergeChildrenProps;
	};
	let renderChildren;
	if (isValidElement(children)) {
		/* 获取 | 合并 ｜ 转发 | =>  props  */
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
