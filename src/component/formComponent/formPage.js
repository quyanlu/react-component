import React, {useEffect, useRef} from 'react';
import Form, {Input} from './form';

const FormItem = Form.FormItem;
function FormPage() {
	const form = useRef(null);
	useEffect(() => {
		console.log(form.current, 'form.current');
	}, []);

	const handleClick = () => {
		form.current.submit((res)=>{
			console.log(res);
		})
	};
	return <div style={{marginTop: '50px', marginLeft: '50px'}}>
		<Form
			initialValues={{author: '我不是外星人'}}
			ref={form}
		>
			<FormItem
				label="请输入小册名称"
				labelWidth={150}
				name="name"
				required
				rules={{
					rule: /^[a-zA-Z0-9_\u4e00-\u9fa5]{4,32}$/,
					message: '名称仅支持中文、英文字母、数字和下划线，长度限制4~32个字',
				}}
				validateTrigger="onBlur"
			>
				<Input
					placeholder="小册名称"
				/>
			</FormItem>
			<button className="searchbtn"
				onClick={handleClick}
				type="button"
			>提交
			</button>
			<button className="concellbtn"
				type="reset"
			>重置</button>
		</Form>
	</div>;
}

export default FormPage;
