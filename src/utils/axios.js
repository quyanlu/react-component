import axios from 'axios';
import {message} from 'antd';

class Axios {
	static ajax(options) {
		console.log(options);
		let baseApi = 'https://testzoho.meorient.com/';
		return new Promise((resolve, reject) => {
			axios({
				url: options.url,
				method: 'post',
				baseURL: baseApi,
				timeout: 120000,
				data: options.data || '',
			})
				.then(response => {
					let res = response.data;
					if (response.status == '200') {
						if (res.code == '20000') {
							resolve(res);
						} else {
							reject(res);
							message.error(res.error.errorMsg);
						}
					} else {
						reject(response.data);
						message.error(res.error.errorMsg);
					}
				})
				.catch(err => {
					message.error('网络异常');
				});
		});
	}
}
const createApiMethod = url => {
	return data => Axios.ajax({url, data});
};
const axiosServer = {
	//获取用户拨打任务列表
	listCallByConditions: createApiMethod('/open_api/v1/zoho-calls/list-call-by-conditions'),
	//通过公司名称获取联系人
	listContactByBizId: createApiMethod('/open_api/v1/zoho-contacts/list-contact-by-biz-id'),
	//拨打计划-通话记录保存
	add: createApiMethod('/open_api/v1/calls-records/add'),
	//历史活动记录
	listActivityByBizId: createApiMethod('/open_api/v1/zoho-calls/list-activity-by-biz-id'),
	//获取线索｜客户基础信息 B2B信息 ，补充信息，产品标签
	getDetailById: createApiMethod('/open_api/v1/zoho-calls/get-detail-by-id'),
	//更新海关信息
	updateCustomsInfoByIdAndModule: createApiMethod('/open_api/v1/zoho-calls/update-customs-info-by-id-and-module'),
	//更新线索或者客户的补充信息
	updateSupplyInfoByIdAndModule: createApiMethod('/open_api/v1/zoho-calls/update-supply-info-by-id-and-module'),
	//获取省市区县 联动下拉框
	mapAddressInfoByCondition: createApiMethod('/open_api/v1/address/map-address-info-by-condition'),
	//更新线索或者模块的基本信息
	updateBasicInfoByIdAndModule: createApiMethod('/open_api/v1/zoho-calls/update-basic-info-by-id-and-module'),
	//获取主营产品列表
	listMainProduct: createApiMethod('/open_api/v1/zoho-product-tags/list-main-product'),
	//拨打记录-列表
	getRecords: createApiMethod('/open_api/v1/calls-records/get-records'),
	//获取部门和创建人
	getStructures: createApiMethod('/open_api/v1/calls-records/get-structures'),
	//拨打记录-获取通话时长列表
	getDurationList: createApiMethod('/open_api/v1/calls-records/get-duration-list'),
	//添加会议-保存
	saveEvent: createApiMethod('/open_api/v1/zoho-calls/save-event'),
	//添加会议页面所需信息
	getAddEventNeedInfo: createApiMethod('/open_api/v1/zoho-calls/get-add-event-need-info'),
	//获取用户列表-模糊搜索
	listUserByFullName: createApiMethod('/open_api/v1/zoho-users/list-user-by-full-name'),
	//获取产品标签
	listProductTagsByName: createApiMethod('/open_api/v1/zoho-product-tags/list-product-tags-by-name'),
	//更新产品标签
	operateProductTagsByIdAndModule: createApiMethod('/open_api/v1/zoho-calls/operate-product-tags-by-id-and-module'),
	//获取职位和角色
	listPositionAndRole: createApiMethod('/open_api/v1/zoho-contacts/list-position-and-role'),
	//添加联系人
	addContactByAccountId: createApiMethod('/open_api/v1/zoho-contacts/add-contact-by-account-id'),
	//修改联系人信息
	updateContactByModuleAndContactId: createApiMethod('/open_api/v1/zoho-contacts/update-contact-by-module-and-contact-id'),
	//获取当前用户用户信息
	getUserByZohoId: createApiMethod('/open_api/v1/zoho-users/get-user-by-zoho-id'),
	//判断当前线索或者客户是否属于当前登陆用户
	checkOwner: createApiMethod('/open_api/v1/zoho-calls/check-owner'),
};
export default axiosServer;
