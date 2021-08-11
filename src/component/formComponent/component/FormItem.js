import React, {cloneElement, isValidElement, memo, useContext, useEffect, useMemo, useState} from 'react';
import FormContext from './FormContext';
import Label from './Label';
import Message from './Message';

function FormItem(props) {
	const {name, children, label, height = 50, labelWidth, required = false, rules = {}, trigger = 'onChange', validateTrigger = 'onChange'} = props;
	const formInstance = useContext(FormContext);
	console.log(formInstance, 'formInstance');
	const { registerValidateFields , dispatch , unRegisterValidate } = formInstance
	const [, forceUpdate] = useState({});
	const onStoreChange = useMemo(() => {
		//管理层改变 =》 通知表单项
		const onstoreChange = {
			changeValue() {
				forceUpdate({});
			},
		};
		return onstoreChange;
	}, [formInstance]);

	useEffect(() => {
		//注册表单
		name && registerValidateFields(name, onStoreChange, {...rules, required});
		return function() {
			//卸载表单
			name && unRegisterValidate(name);
		};
	}, [onStoreChange]);

	//使表单控件变成可控组件
	const getControlled = (child) => {
		const mergeChildrenProps = {...child.props};
		console.log(mergeChildrenProps, "mergeChildrenPropsmergeChildrenPropsmergeChildrenProps");
		if (!name) return mergeChildrenProps;
		//改变表单单元项的值
		const handleChange = (e) => {
			const value = e.target.value;
			dispatch({type: 'setFieldsValue'}, name, value);
		};
		mergeChildrenProps[trigger] = handleChange;
		if (required || rules) {
			//验证表单单元项的值
			mergeChildrenProps[validateTrigger] = (e) => {
				//当改变值和验证表单，用统一一个事件
				if (validateTrigger === trigger) {
					handleChange(e);
				}
				dispatch({type: 'validateFieldValue'});
			};
		}
		mergeChildrenProps.value = dispatch({type: 'getFieldValue'}, name) || '';
		return mergeChildrenProps;
	};
	let renderChildren;
	if (isValidElement(children)) {
		//获取 | 合并 | 转发 | =》props
		renderChildren = cloneElement(children, getControlled(children));
	} else {
		renderChildren = children;
	}

	return (
		<Label
			height={height}
			label={label}
			labelWidth={labelWidth}
			required={required}
		>
			{renderChildren}
			<Message name={name} {...dispatch({type: 'getFieldModel'}, name)} />
		</Label>
	);
}
export default memo(FormItem)
