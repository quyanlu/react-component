import React, {useEffect, useRef} from 'react';
import Form, {Input} from './form';
import './formPage.scss';
import Select from './component/Select';

const FormItem = Form.FormItem;
const Option = Select.Option;
function FormPage() {
	const form = useRef(null);
	useEffect(() => {
		console.log(form.current, 'form.current');
	}, []);

	const handleClick = () => {
		form.current.submit((res) => {
			console.log(res);
		});
	};

	const handleGetValue = () => {
		const value = form.current.getFieldsValue();
		console.log(value);
	};

	return <div className="form_page" style={{marginTop: '50px', marginLeft: '50px'}}>
		<Form
			initialValues={{name: '我不是外星人'}}
			ref={form}
		>
			<FormItem
				label="小册名称"
				labelWidth={150}
				name="name"
				required
				rules={{
					rule: /^[a-zA-Z0-9_\u4e00-\u9fa5]{4,32}$/,
					message: '名称仅支持中文、英文字母、数字和下划线，长度限制4~32个字',
				}}
				validateTrigger="onBlur"
			>
				<Input placeholder="小册名称" />
			</FormItem>
			<FormItem
				label="你喜欢的书籍"
				labelWidth={150}
				name="book"
				required
			>
				<Select
					defaultValue={null}
					placeholder="请选择"
					width={120}
				>
					<Option value={1}>前端想能优化</Option>
					<Option value={2}>前端算法</Option>
				</Select>
			</FormItem>
			<div className="button_list">
				<button className="search_btn"
					onClick={handleClick}
					type="button"
				>提交
				</button>
				<button className="concell_btn"
					type="reset"
				>重置
				</button>
			</div>
		</Form>

		<div style={{marginTop: '20px'}}>
			<span>验证表单功能</span>
			<button className="searchbtn"
				onClick={handleGetValue}
				style={{background: 'green'}}
			>获取表单数层
			</button>
			<button className="searchbtn"
				onClick={() => form.current.validateFields((res) => { console.log('是否通过验证：', res); })}
				style={{background: 'orange'}}
			>动态验证表单
			</button>
			<button className="searchbtn"
				onClick={() => {
					form.current.setFieldsValue('name', {
						rule: (value = '') => value.length < 10,
						message: '简介不超过十个字符',
					});
				}}
				style={{background: 'purple'}}
			>动态设置校验规则
			</button>
		</div>
	</div>;
}

export default FormPage;
