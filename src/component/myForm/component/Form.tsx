import useForm from '../hooks/useForm';
import React, {forwardRef, useImperativeHandle} from 'react';
import FormContext from './FormContext';

function Form(props:any,ref:any) {
	const {form, onFinish, onFinishFailed, initialValues, children, className} = props;
	const formInstance = useForm(form, initialValues) as any;
	// @ts-ignore
	const {setCallback, dispatch, ...providerFormInstance} = formInstance;

	setCallback({
		onFinish,
		onFinishFailed,
	});

	useImperativeHandle(ref, () => providerFormInstance, []);

	const RenderChildren = <FormContext.Provider value={formInstance}>{children}</FormContext.Provider>;

	return (
		<form
			className={className}
			onReset={e => {
				e.preventDefault();
				e.stopPropagation();
				formInstance.resetFields();
			}}
			onSubmit={e => {
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
