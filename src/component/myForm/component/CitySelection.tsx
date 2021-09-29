import React, {useEffect, useState} from 'react';
import {Select} from './Select';
import {city, district, province} from '../../../utils/cityData';

const Option = Select.Option;
const CitySelection = (props: { form: any; name: any; clearData: any; }) => {
	const {form, name, clearData} = props;
	const [selectProvince, setSelectProvince] = useState('');
	const [selectCity, setSelectCity] = useState('');
	const [selectDistrict, setSelectDistrict] = useState('');
	const [cityData, setCityData] = useState([]);
	const [districtData, setDistrictData] = useState([]);
	useEffect(() => {
		// @ts-ignore
		selectProvince && setCityData(city[selectProvince]);
		setDistrictData([]);
		setSelectCity('');
		clearSelectValue();
	}, [selectProvince]);
	useEffect(() => {
		// @ts-ignore
		selectCity && setDistrictData(district[selectCity]);
		clearSelectValue();
	}, [selectCity]);

	useEffect(() => {
		setSelectProvince('');
		setDistrictData([]);
		setSelectCity('');
		clearSelectValue();
	}, [clearData]);
	const handleDistrict = (val: React.SetStateAction<string>) => {
		if (val !== '请选择所在区') {
			let obj = {};
			// @ts-ignore
			obj[name] = val;
			form.current.setFields(obj);
		} else {
			clearSelectValue();
		}
		setSelectDistrict(val);
	};
	const clearSelectValue = () => {
		let obj = {};
		// @ts-ignore
		obj[name] = '';
		setSelectDistrict('');
		form.current.setFields(obj);
	};
	return (
		<div className="form-city">
			<Select
				className="form-city-select"
				placeholder="请选择所在省"
				value={selectProvince}
				onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => {
					setSelectProvince(e.target.value);
				}}
			>
				{province.map(item => {
					return (
						<Option key={item} value={item}>
							{item}
						</Option>
					);
				})}
			</Select>
			<Select
				className="form-city-select"
				placeholder="请选择所在市"
				value={selectCity}
				onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => {
					setSelectCity(e.target.value);
				}}
			>
				{cityData?.map(item => {
					return (
						<Option key={item} value={item}>
							{item}
						</Option>
					);
				})}
			</Select>
			<Select
				className="form-city-select"
				placeholder="请选择所在区"
				value={selectDistrict}
				onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => {
					handleDistrict(e.target.value);
				}}
			>
				{districtData?.map( (item:any) => {
					return (
						<Option key={item.key} value={item.key}>
							{item.value}
						</Option>
					);
				})}
			</Select>
		</div>
	);
};

export default CitySelection;
