import {useRef, useState} from 'react';
import {unstable_batchedUpdates} from 'react-dom';

const formInstanceApi = [
	'setCallback', //处理回调函数
	'dispatch', //触发事件
	'registerValidateFields', //注册表单单元项
	'resetFields', //重置表单
	'setFields', // 设置一组字段状态
	'setFieldsValue', // 设置表单值
	'getFieldsValue', // 获取表单数据层的值
	'validateFields', // 表单整体校验
	'submit', //提交表单
	'unRegisterValidate', //卸载表单单元项
];

const isRegExp = (value: any) => value instanceof RegExp;

/**
    数据结构 model = {
        [name] => {
            value    -> 表单值   （可以重新设定）
            rule     -> 验证规则 （可以重新设定）
            required -> 是否必填 -> 在含有rule的情况下默认为true
            message  -> 提示信息
            status   -> 验证状态  resolve -> 成功状态 | reject -> 失败状态 | pendding -> 待验证状态
        }
    }
 **/

class FormStore {
	formUpdate: (value: {} | ((prevState: {}) => {})) => void;
	model: {};
	control: {};
	isSchedule: boolean;
	penddingValidateQueue: any[];
	defaultFormValue: any;
	callback: any;

	// @ts-ignore
	constructor(forceUpdate, defaultValue = {}) {
		this.formUpdate = forceUpdate;
		this.model = {};
		this.control = {};
		this.isSchedule = false;
		this.callback = {};
		this.penddingValidateQueue = [];
		this.defaultFormValue = defaultValue;
	}
	/* 提供操作form的方法 */
	getForm() {
		return formInstanceApi.reduce((map: any, item: any) => {
			// @ts-ignore
			map[item] = this[item].bind(this);
			return map;
		}, {});
	}
	/* 创建一个验证模块 */
	static createValidate(validate: any) {
		const {value, rules, required, message} = validate;

		return {
			value,
			rule: rules || (() => true),
			required: required || false,
			message: message || '',
			status: 'pendding',
		};
	}
	/* 处理回调函数 */
	setCallback(callback: Function) {
		if (callback) this.callback = callback;
	}
	/* 触发事件 */
	dispatch(action: any, ...arg: any[]) {
		if (!action && typeof action !== 'object') return null;
		const {type} = action;
		if (~formInstanceApi.indexOf(type)) {
			// @ts-ignore
			return this[type](...arg);
		} else { // @ts-ignore
			if (typeof this[type] === 'function') {
				// @ts-ignore
				return this[type](...arg);
			}
		}
	}
	/* 注册表单单元项 */
	registerValidateFields(name: string | number, control: any, model: { value: any; }) {
		if (this.defaultFormValue[name]) model.value = this.defaultFormValue[name];
		const validate = FormStore.createValidate(model);
		// @ts-ignore
		this.model[name] = validate;
		// @ts-ignore
		this.control[name] = control;
	}
	/* 卸载注册表单单元项 */
	unRegisterValidate(name: string | number) {
		// @ts-ignore
		delete this.model[name];
		// @ts-ignore
		delete this.control[name];
	}
	/* 重置表单 */
	resetFields() {
		Object.keys(this.model).forEach(modelName => {
			// @ts-ignore
			this.setValueClearStatus(this.model[modelName], modelName, null);
		});
	}
	/* 设置一组字段状态	  */
	setFields(object:any) {
		if (typeof object != 'object') return;
		Object.keys(object).forEach(modelName => {
			this.setFieldsValue(modelName, object[modelName]);
		});
	}
	/* 设置表单值 */
	setFieldsValue(name: string, modelValue: { message: any; rule: any; value: any; }) {
		// @ts-ignore
		const model = this.model[name];
		if (!model) return false;
		if (typeof modelValue === 'object') {
			const {message, rule, value} = modelValue;
			if (message) model.message = message;
			if (rule) model.rule = rule;
			if (value) model.value = value;
			model.status = 'pendding';
			this.validateFieldValue(name, true);
		} else {
			this.setValueClearStatus(model, name, modelValue);
		}
	}
	/* 复制并清空状态 */
	setValueClearStatus(model: { value: any; status: string; }, name: string, value: null) {
		model.value = value;
		model.status = 'pendding';
		this.notifyChange(name);
	}
	/* 通知对应FormItem更新 */
	notifyChange(name: string) {
		// @ts-ignore
		const controller = this.control[name];
		if (controller) controller?.changeValue();
	}
	/* 获取表单数据层的值 */
	getFieldsValue() {
		const formData = {};
		Object.keys(this.model).forEach(modelName => {
			// @ts-ignore
			formData[modelName] = this.model[modelName].value;
		});
		return formData;
	}
	/* 获取表单模型 */
	getFieldModel(name: string | number) {
		// @ts-ignore
		const model = this.model[name];
		return model ? model : {};
	}
	/* 获取对应字段名的值 */
	getFieldValue(name: string | number) {
		// @ts-ignore
		const model = this.model[name];
		if (!model && this.defaultFormValue[name]) return this.defaultFormValue[name];
		return model ? model.value : null;
	}
	/* 单一表单单元项验证 */
	validateFieldValue(name: string, forceUpdate = false) {
		// @ts-ignore
		const model = this.model[name];
		const lastStatus = model?.status;
		if (!model) return null;
		const {required, rule, value} = model;
		let status = 'resolve';
		let message = '';
		if (required && !value) {
			status = 'reject';
		} else if (rule.length > 0) {
			rule.forEach((item:any) => {
				if (isRegExp(item.rule)) {
					status = item.rule.test(value) ? 'resolve' : 'reject';
					message = item.rule.test(value) ? '' : item.message;
				} else if (typeof item.rule === 'function') {
					status = item.rule(value) ? 'resolve' : 'reject';
					message = item.rule(value) ? '' : item.message;
				}
			});
		}
		model.status = status;
		model.message = message;
		if (lastStatus !== status || forceUpdate) {
			const notify = this.notifyChange.bind(this, name);
			this.penddingValidateQueue.push(notify);
		}
		this.scheduleValidate();
		return status;
	}
	/* 批量调度验证更新任务 */
	scheduleValidate() {
		if (this.isSchedule) return;
		this.isSchedule = true;
		Promise.resolve().then(() => {
			unstable_batchedUpdates(() => {
				do {
					let notify = this.penddingValidateQueue.shift();
					notify && notify();
				} while (this.penddingValidateQueue.length > 0);
				this.isSchedule = false;
			});
		});
	}
	/* 表单整体验证 */
	validateFields(callback: { (res: any): void; (arg0: boolean): void; }) {
		let status = true;
		Object.keys(this.model).forEach(modelName => {
			const modelStates = this.validateFieldValue(modelName, true);
			if (modelStates === 'reject') status = false;
		});
		callback(status);
	}
	/* 提交表单 */
	submit(cb: (arg0: any) => any) {
		this.validateFields(res => {
			const {onFinish, onFinishFailed} = this.callback;
			cb && cb(res);
			if (!res) onFinishFailed && typeof onFinishFailed === 'function' && onFinishFailed();
			onFinish && typeof onFinish === 'function' && onFinish(this.getFieldsValue());
		});
	}
}
function useForm(form: null, defaultValue: {} | undefined) {
	const formRef = useRef(null as any);
	const [, forceUpdate] = useState({});
	if (!formRef.current) {
		if (form) {
			formRef.current = form;
		} else {
			const formStoreCurrent = new FormStore(forceUpdate, defaultValue);
			formRef.current = formStoreCurrent.getForm();
		}
	}
	return formRef.current;
}
export default useForm;
