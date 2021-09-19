import React, {Children, cloneElement, Component} from 'react';

class Form extends Component {
	state = {
		formDate: {} as any
	};

	submitForm = (cb: (arg0: {}) => void) => {
		cb({...this.state.formDate});
	};

	resetForm = () => {
		const {formDate} = this.state;
		Object.keys(formDate).forEach((item) => {
			formDate[item] = '';
		});
		this.setState({formDate});
	};

	setValue = (name: any, value: any) => {
		this.setState({formDate: {...this.state.formDate, [name]: value}});
	};
	static displayName: string;

	render() {
		const {children} = this.props;
		const renderChildren: React.FunctionComponentElement<{ key: any; handleChange: (name: any, value: any) => void; value: any; }>[] = [];
		Children.forEach(children, (child: any) => {
			if (child.type.dispalyName === 'formItem') {
				const {name} = child.props;
				const Children = cloneElement(child, {
					key: name,
					handleChange: this.setValue,
					value: this.state.formDate[name] || ''
				}, child.props.children);
				renderChildren.push(Children);
			}
		});
		console.log(renderChildren);
		return renderChildren;
	}
}

Form.displayName = 'form';
export default Form;
