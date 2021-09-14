/* 模拟数据请求 */
import {Button, Col, Input, Row, Table} from 'antd';
import React, {useState} from 'react';
import {ColumnProps} from 'antd/es/table';
import UpOutlined from '@ant-design/icons/lib/icons/UpOutlined';
import DownOutlined from '@ant-design/icons/lib/icons/DownOutlined';
import useQueryTable from './hooks/useQueryTable';
import axiosServer from '../../utils/axios';


function getTableData(payload:any) {
	payload.user_id = '181505000000445003';
	payload.start_create_time = '2021-09-01';
	payload.end_create_time = '2021-09-09';
	return axiosServer.getRecords(payload);
}
function DetailReport() {
	const [expand, setExpand] = useState(false);
	const [table, form] = useQueryTable({page: 1, pageSize: 10}, getTableData);
	const {formData, setFormItem, reset} = form;
	const {pagination, tableData, getList, handlerChange} = table;
	const columns: ColumnProps<any>[] = [
		{
			title: '创建时间',
			dataIndex: 'created_time',
			width: 150,
			fixed: 'left',
		},
		{
			title: '创建人',
			dataIndex: 'created_by_name',
			width: 150,
			fixed: 'left',
		},
		{
			title: '公司名',
			dataIndex: 'company',
			width: 250,
			fixed: 'left',
		},
		{
			title: '联系人',
			dataIndex: 'contacts_name',
			width: 150,
			fixed: 'left',
		},
		{
			title: '拨打号码',
			dataIndex: 'call_mobile',
			width: 150,
			fixed: 'left',
		},
		{
			title: '联系人职位',
			width: 150,
			dataIndex: 'position',
		},
		{
			title: '拨打状态',
			width: 150,
			dataIndex: 'call_status',
		},
		{
			title: '通话时长',
			width: 100,
			dataIndex: 'call_duration_in_seconds',
			render: val => (
				<span>
					{val}
					{val && 's'}
				</span>
			),
		},
		{
			title: '小结',
			width: 550,
			ellipsis: true,
			dataIndex: 'call_remarks',
			render: val => <span>{val}</span>,
		},
		{
			title: '通话录音',
			width: 300,
			dataIndex: 'record_url',
			render: val => (val ? <audio src={val} controls /> : ' '),
		},
		{
			title: '一级部门',
			width: 100,
			dataIndex: 'primary_department_name',
		},
		{
			title: '二级部门',
			width: 100,
			dataIndex: 'secondary_department_name',
		},
	];
	const getFields = () => {
		const children = [
			<Col span={8} style={{marginBottom: '20px'}}>
				<Row gutter={24}>
					<Col span={6} style={{textAlign: 'right'}}><span>公司名:</span></Col>
					<Col span={18}>
						<Input
							placeholder="请输入公司名"
							value={formData.company || ''}
							onChange={(e) => setFormItem('company', e.target.value)}
						/>
					</Col>
				</Row>
			</Col>,
			<Col span={8} style={{marginBottom: '20px'}}>
				<Row gutter={24}>
					<Col span={6} style={{textAlign: 'right'}}><span>公司名:</span></Col>
					<Col span={18}>
						<Input
							placeholder="请输入公司名"
							value={formData.company || ''}
							onChange={(e) => setFormItem('company', e.target.value)}
						/>
					</Col>
				</Row>
			</Col>,
			<Col span={8} style={{marginBottom: '20px'}}>
				<Row gutter={24}>
					<Col span={6} style={{textAlign: 'right'}}><span>公司名:</span></Col>
					<Col span={18}>
						<Input
							placeholder="请输入公司名"
							value={formData.company || ''}
							onChange={(e) => setFormItem('company', e.target.value)}
						/>
					</Col>
				</Row>
			</Col>,
			<Col span={8} style={{marginBottom: '20px'}}>
				<Row gutter={24}>
					<Col span={6} style={{textAlign: 'right'}}><span>公司名:</span></Col>
					<Col span={18}>
						<Input
							placeholder="请输入公司名"
							value={formData.company || ''}
							onChange={(e) => setFormItem('company', e.target.value)}
						/>
					</Col>
				</Row>
			</Col>,
			<Col span={8} style={{marginBottom: '20px'}}>
				<Row gutter={24}>
					<Col span={6} style={{textAlign: 'right'}}><span>公司名:</span></Col>
					<Col span={18}>
						<Input
							placeholder="请输入公司名"
							value={formData.company || ''}
							onChange={(e) => setFormItem('company', e.target.value)}
						/>
					</Col>
				</Row>
			</Col>,
			<Col span={8} style={{marginBottom: '20px'}}>
				<Row gutter={24}>
					<Col span={6} style={{textAlign: 'right'}}><span>公司名:</span></Col>
					<Col span={18}>
						<Input
							placeholder="请输入公司名"
							value={formData.company || ''}
							onChange={(e) => setFormItem('company', e.target.value)}
						/>
					</Col>
				</Row>
			</Col>,
			<Col span={8} style={{marginBottom: '20px'}}>
				<Row gutter={24}>
					<Col span={6} style={{textAlign: 'right'}}><span>公司名:</span></Col>
					<Col span={18}>
						<Input
							placeholder="请输入公司名"
							value={formData.company || ''}
							onChange={(e) => setFormItem('company', e.target.value)}
						/>
					</Col>
				</Row>
			</Col>,
			<Col span={8} style={{marginBottom: '20px'}}>
				<Row gutter={24}>
					<Col span={6} style={{textAlign: 'right'}}><span>公司名:</span></Col>
					<Col span={18}>
						<Input
							placeholder="请输入公司名"
							value={formData.company || ''}
							onChange={(e) => setFormItem('company', e.target.value)}
						/>
					</Col>
				</Row>
			</Col>,
			<Col span={8} style={{marginBottom: '20px'}}>
				<Row gutter={24}>
					<Col span={6} style={{textAlign: 'right'}}><span>公司名:</span></Col>
					<Col span={18}>
						<Input
							placeholder="请输入公司名"
							value={formData.company || ''}
							onChange={(e) => setFormItem('company', e.target.value)}
						/>
					</Col>
				</Row>
			</Col>,
			<Col span={8} style={{marginBottom: '20px'}}>
				<Row gutter={24}>
					<Col span={6} style={{textAlign: 'right'}}><span>公司名:</span></Col>
					<Col span={18}>
						<Input
							placeholder="请输入公司名"
							value={formData.company || ''}
							onChange={(e) => setFormItem('company', e.target.value)}
						/>
					</Col>
				</Row>
			</Col>,
		];
		return expand ? children : children.slice(0, 6);
	};
	return <div style={{width: '100%',background: '#FFFFFF',padding: '40px 20px'}}>
		<div style={{marginBottom: '24px'}}>
			<Row gutter={24}>
				<Col span={19}>
					<Row gutter={24}>{
						getFields().map((item) => {
							return item;
						})
					}</Row>
				</Col>
				<Col span={5}>
					<Row gutter={24}>
						<Col span={24} style={{textAlign: 'right'}}>
							<Button type="primary" onClick={() => getList()}>
								搜索
							</Button>
							<Button
								style={{margin: '0 20px'}}
								onClick={() => reset()}
							>
								重置
							</Button>
						</Col>
						<Col span={24} style={{textAlign: 'right', padding: '20px 135px 0 0'}}>
							<a
								style={{fontSize: 14}}
								onClick={() => {
									setExpand(!expand);
								}}
							>
								{expand ? <UpOutlined /> : <DownOutlined />}
								{expand ? '收起' : '展开'}
							</a>
						</Col>
					</Row>
				</Col>
			</Row>
		</div>
		<Table
			scroll={{y: 500}}
			columns={columns}
			dataSource={tableData.data}
			onChange={(res) => { handlerChange(res.current, res.pageSize); }}
			pagination={{...pagination, total: tableData.total, current: tableData.current}} rowKey="id"
		/>
	</div>;
}
export default DetailReport;
