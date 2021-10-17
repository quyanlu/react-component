import React, {useEffect, useRef, useState} from 'react';
import './Home.scss';
import {Select} from './component/Select';
import Form, {FormItem, Input} from './form';
import CitySelection from './component/CitySelection';
import {TextArea} from './component/TextArea';

const Option = Select.Option;
const Home = (props: any) => {
	const [clearData, setClearData] = useState({});
	const [userInfo, setUserInfo] = useState({} as any);
	const form = useRef(null as any);
	const randomNum = () => {
		let randStr = '';
		for (let i = 0; i < 12; i++) {
			let randItem = Math.floor(Math.random() * 10);
			randStr += randItem;
		}
		return randStr;
	};
	const handleClick = () => {
		form.current.submit(async (res: any) => {
			console.log(res);
			if (res) {
				const value = form.current.getFieldsValue();
				value.corpserialno = randomNum();
				value.TOTAL_SIZE = 1;
				value.exportscaleKey = 'exportscale';
				value.exportscaleVal = value.exportscale;
				value.env = 3;
				value.cert = 0;
				value.certl = 1;
				value.service_class = 1;
				value.s_service0 = '';
				value.s_service2 = '';
				value.s_service3 = '';
				value.s_service1 = 'doEdiEnquireInsurApply';
				value.paramType = 'com.sinosure.exchange.sedi3.po.EnquireInsurApplyInfo';
				value.paramSub01Type = '';
				value.paramSub02Type = 'com.sinosure.exchange.sedi3.po.EdiExpObject';
				value.companyname = value.companyname.replace(/\s*/g, '');
				value.creditno = value.creditno.replace(/\s*/g, '');
				value.linkmanname = value.linkmanname.replace(/\s*/g, '');
				value.regaddr = value.regaddr.replace(/\s*/g, '');
				form.current.resetFields();
			}
		});
	};

	const checkInputNum = (val: string | any[], num: number) => {
		if (val && val.length > num) {
			return false;
		} else {
			return true;
		}
	};
	return (
		<div className="home-page">
			<div className="home-title">请填写以下内容</div>
			<div className="home-title-h5">
				<span>自用表单页</span>
			</div>

			<Form
				ref={form}
				className="home-form-style"
				initialValues={{
					companyname: userInfo.companyName,
					linkmanname: userInfo.nickname,
					email: userInfo.email,
					phoneNo: userInfo.mobile?.slice(3),
					linkmantel: '',
				}}
			>
				<FormItem
					className="home-item-style"
					label="统一社会信用代码"
					name="creditno"
					required
					validateTrigger="onKeyUp"
					// validateTrigger="onBlur"
					rules={[
						{
							rule: (val: string | any[]) => checkInputNum(val, 30),
							message: '不超过30个字符',
						},
					]}
				>
					<Input placeholder="请输入统一社会信用代码" className="home-input-style" />
				</FormItem>
				<FormItem
					className="home-item-style"
					label="公司名称"
					name="companyname"
					required
					validateTrigger="onKeyUp"
					rules={[
						{
							rule: (val: string | any[]) => checkInputNum(val, 25),
							message: '不超过25个字符',
						},
					]}
				>
					<Input placeholder="请输入公司名称" className="home-input-style" />
				</FormItem>
				<FormItem className="home-item-style" label="注册地址" name="areano" required requiredMessage="未选择注册地址" validateTrigger="onBlur">
					<CitySelection form={form} name="areano" clearData={clearData} />
				</FormItem>
				<FormItem
					className="home-item-style home-regaddr-style"
					label=""
					name="regaddr"
					required
					requiredMessage="未输入完整的注册地址"
					validateTrigger="onKeyUp"
					rules={[
						{
							rule: (val: string | any[]) => checkInputNum(val, 300),
							message: '不超过300个字符',
						},
					]}
				>
					<Input placeholder="请输入详细地址" className="home-input-style" />
				</FormItem>
				<FormItem className="home-item-style" label="上一年出口规模" name="exportscale" required requiredMessage="未选择上一年出口规模" validateTrigger="onBlur">
					<Select placeholder="请选择" className="home-input-style">
						<Option value={0}>一亿美元(含)以上</Option>
						<Option value={1}>2000万美元(含) - 1亿美元</Option>
						<Option value={2}>300万美元(含) - 2000万美元</Option>
						<Option value={3}>300万美元以下</Option>
					</Select>
				</FormItem>
				<FormItem
					className="home-item-style"
					label="联系人"
					name="linkmanname"
					required
					validateTrigger="onKeyUp"
					rules={[
						{
							rule: (val: string | any[]) => checkInputNum(val, 50),
							message: '不超过50个字符',
						},
					]}
				>
					<Input placeholder="请输入联系人" className="home-input-style" />
				</FormItem>
				<FormItem
					className="home-item-style"
					label="联系邮箱"
					name="email"
					required
					validateTrigger="onKeyUp"
					rules={[
						{
							rule: (val: string | any[]) => checkInputNum(val, 100),
							message: '不超过100个字符',
						},
						{
							rule: /^[a-z0-9_-]+(\.[a-z0-9_-]+)*@[a-z0-9_-]+(\.[a-z0-9_-]+)+$/i,
							message: '请输入正确的邮箱格式',
						},
					]}
				>
					<Input placeholder="请输入联系邮箱" className="home-input-style" />
				</FormItem>
				<FormItem
					className="home-item-style"
					label="联系手机"
					name="phoneNo"
					required
					validateTrigger="onKeyUp"
					rules={[
						{
							rule: (val: any) => checkInputNum(val, 50),
							message: '不超过50个字符',
						},
						{
							rule: /^[0-9]+$/,
							message: '请输入正确的手机格式',
						},
					]}
				>
					<Input placeholder="请输入联系手机" className="home-input-style" />
				</FormItem>
				<FormItem
					className="home-item-style"
					label="联系电话"
					name="linkmantel"
					required
					validateTrigger="onKeyUp"
					rules={[
						{
							rule: (val: any) => checkInputNum(val, 50),
							message: '不超过50个字符',
						},
						{
							rule: /^[0-9]+$/,
							message: '请输入正确的电话格式',
						},
					]}
				>
					<Input placeholder="请输入联系电话" className="home-input-style" />
				</FormItem>
				<FormItem className="home-item-style" label="询保内容" name="quesradios" required requiredMessage="未选择询保内容" validateTrigger="onBlur">
					<RadioList form={form} clearData={clearData} />
				</FormItem>
			</Form>

			<div className="home-button-list">
				<a className="home-add-btn" onClick={handleClick} type="button">
					提交
				</a>
			</div>
		</div>
	);
};

const RadioList = (props: {form?: any; clearData?: any;}) => {
	const [selectVal, setSelectVal] = useState('');
	const {clearData} = props;
	useEffect(() => {
		setSelectVal('');
	}, [clearData]);

	const handleCheck = (val: React.SetStateAction<string>) => {
		setSelectVal(val);
		let obj = {};
		// @ts-ignore
		obj['quesradios'] = val;
		props.form.current.setFields(obj);
	};
	return (
		<>
			<p>
				<label className="form-radio">
					<input checked={selectVal === '0'} value="0" name="quesradios" type="radio" onChange={e => handleCheck(e.target.value)} />
					投保
				</label>
				<label className="form-radio">
					<input checked={selectVal === '1'} value="1" name="quesradios" type="radio" onChange={e => handleCheck(e.target.value)} />
					调查买方资信
				</label>
				<label className="form-radio">
					<input checked={selectVal === '2'} value="2" name="quesradios" type="radio" onChange={e => handleCheck(e.target.value)} />
					其他需求
				</label>
			</p>
			{selectVal === '2' && (
				<FormItem className="home-radio-textarea" height={120} label="" name="otherrequire" required validateTrigger="onKeyUp" requiredMessage="未输入其他需求">
					<TextArea placeholder="请输入其他需求" className="dddd" />
				</FormItem>
			)}
		</>
	);
};

export default Home;
