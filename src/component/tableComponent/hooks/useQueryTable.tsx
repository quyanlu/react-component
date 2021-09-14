/**
 *
 * @param {*} defaultQuery  表单查询默认参数
 * @param {*} api           接口
 */
import {useCallback, useEffect, useRef, useState} from 'react';

function useQueryTable(defaultQuery: {pageSize: number; page: number}, api: any) {
	/*保存查询表格表单信息*/
	const formData = useRef({} as any);
	const {page, pageSize = 10} = defaultQuery;
	/*保存查询表格分页信息*/
	const pagination = useRef({
		page: page || 1,
		pageSize: pageSize || 10,
	});
	//强制刷新
	const [, forceUpdate] = useState({});
	//请求列表数据
	const [tableData, setTableData] = useState({
		data: [],
		total: 0,
		current: 1,
	} as any);
	//请求列表数据
	const getList: any = useCallback(async function(payload = {}) {
		if (!api) return;
		const data = await api({...defaultQuery, ...payload, ...pagination.current, ...formData.current}) || {};
		if (data.code === 20000) {
			setTableData({data: data.data.res, current: data.data.current_page, total: data.data.count});
		}
	}, [api]);

	//改变表单单元项
	const setFormItem: any = useCallback(function(key: any, value: any) {
		const form = formData.current;
		form[key] = value;
		forceUpdate({});
	}, []);
	//重置表单
	const reset: any = useCallback(function() {
		const current = formData.current;
		for (let name in current) {
			current[name] = '';
		}
		pagination.current.page = defaultQuery.page || 1;
		pagination.current.pageSize = defaultQuery.pageSize || 10;
		getList();
	}, [getList]);

	//处理分页
	const handlerChange: any = useCallback(async function(page:number, pageSize:number) {
		pagination.current = {
			page,
			pageSize,
		};
		getList();
	}, [getList]);

	//初始化请求数据
	useEffect(() => {
		getList();
	}, []);

	return [
		{
			tableData,
			handlerChange,
			getList,
			pagination: pagination.current,
		},
		{
			formData: formData.current,
			setFormItem,
			reset,
		},
	];

}
export default useQueryTable;
