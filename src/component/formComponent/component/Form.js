import React, {forwardRef, useImperativeHandle} from 'react';
import useForm from '../hooks/useForm';
import FormContext from './FormContext';

function Form(props, ref) {
	const {form, onFinish, onFinishFailed, initialValues, children} = props;
	//创建form状态管理实例
	const formInstance = useForm(form, initialValues);
	//抽离属性 -> 抽离dispatch | setCallback 这两个方法不能对外提供
	const {setCallback, dispatch, ...providerFormInstance} = formInstance;

	//向form中注册回调函数
	setCallback({
		onFinish,
		onFinishFailed,
	});

	//form 能够被ref标记,并操作实例
	useImperativeHandle(ref, () => providerFormInstance, []);

	const RenderChildren = <FormContext.Provider value={formInstance}> {children} </FormContext.Provider>;

	return (
		<form
			onReset={(e) => {
				e.preventDefault();
				e.stopPropagation();
				formInstance.resetFields(); // 重置表单
			}}
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				formInstance.submit();
			}}
		>
			{RenderChildren}
		</form>
	);
}
export default forwardRef(Form);
