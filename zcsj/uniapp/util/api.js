// const baseUrl = 'https://zhuochuang.program66.com/api'
const baseUrl = 'http://111.231.238.159:9090'
const httpRequest = (opts, data) => {
	let httpDefaultOpts = {
		url: baseUrl + opts.url,
		data: data,
		method: opts.method,
		header: opts.method == 'get' ? {
			'X-Requested-With': 'XMLHttpRequest',
			"Accept": "application/json",
			'Authorization': 'Basic c2FiZXI6c2FiZXJfc2VjcmV0',
			"Content-Type": "application/json; charset=UTF-8"
		} : {
			'X-Requested-With': 'XMLHttpRequest',
			'Authorization': 'Basic c2FiZXI6c2FiZXJfc2VjcmV0',
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		},
		dataType: 'json',
	}

	let promise = new Promise(function(resolve, reject) {
		uni.showLoading({
			title: '加载中'
		});
		uni.request(httpDefaultOpts).then(
			(res) => {
				resolve(res[1])
			}
		).catch(
			// setTimeout((response) => {
			//     reject(response)
			// },0)
			(response) => {
				reject(response)
			}
		)
	})
	setTimeout(function() {
		uni.hideLoading();
	}, 2000);
	promise.then(() => {}).catch(() => {})
	return promise
};
//带Token请求
const httpTokenRequest = (opts, data) => {
	const token = uni.getStorageSync('token');
	//此token是登录成功后后台返回保存在storage中的
	let httpDefaultOpts = {
		url: baseUrl + opts.url,
		data: data,
		method: opts.method,
		header: opts.method == 'get' ? {
			'X-Requested-With': 'XMLHttpRequest',
			'Blade-Auth': "Bearer " + token,
			'Authorization': 'Basic c2FiZXI6c2FiZXJfc2VjcmV0',
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		} : {
			'X-Requested-With': 'XMLHttpRequest',
			'Blade-Auth': "Bearer " + token,
			'Authorization': 'Basic c2FiZXI6c2FiZXJfc2VjcmV0',
			"Accept": "application/json",
			"Content-Type": "application/json; charset=UTF-8"
		},
		dataType: 'json',
	}
	let promise = new Promise(function(resolve, reject) {
		uni.showLoading({
			title: '加载中'
		});
		uni.request(httpDefaultOpts).then(
			(res) => {
				resolve(res[1])
			}
		).catch(
			// setTimeout((response) => {
			//     reject(response)
			// },0)
			(response) => {
				reject(response)
			}
		)
	})
	setTimeout(function() {
		uni.hideLoading();
	}, 1000);
	promise.then(() => {}).catch(() => {})
	return promise
};
export default {
	baseUrl,
	httpRequest,
	httpTokenRequest,
	login: (data) => { //登录接口
		return httpRequest({
			url: `/blade-auth/oauth/token?tenantId=000000&username=${data.username}&password=${data.password}&grant_type=captcha&scope=all&type=account`,
			method: 'post'
		}, data)
	},
	getCaptcha: (data) => { //登录接口
		return httpRequest({
			url: '/blade-auth/oauth/captcha',
			method: 'get'
		}, data)
	},
	companyLevel: () => { //公司登记
		return httpTokenRequest({
			url: "/blade-system/dict/dictionary?code=company_level",
			method: 'get'
		})
	},
	companySourse: () => { //根客户来源
		return httpTokenRequest({
			url: "/crm/company/source",
			method: 'get'
		})
	},
	menuTree:() => { //所属行业
		return httpTokenRequest({
			url: "/crm/business/tree",
			method: 'get'
		})
	}, 
	//公司列表
	getCompanyList:(data)=>{
		return httpTokenRequest({
			url: "/crm/company/page",
			method: 'get'
		},data)
	},
	//新增公司
	addCompany:(data)=>{
		return httpTokenRequest({
			url: "/crm/company/save",
			method: 'post'
		},data)
	},
	//编辑公司
	updataCompany:(data)=>{
		return httpTokenRequest({
			url: "/crm/company/update",
			method: 'post'
		},data)
	},
	//公司详情
	companyDeatil:(id)=>{
		return httpTokenRequest({
			url: `/crm/company/detail?id=${id}`,
			method: 'get'
		},id)
	},
	//反查地区
	getRegionDetail:(code)=>{
		return httpTokenRequest({
			url: `/blade-system/region/detail?code=${code}`,
			method: 'get'
		},code)
	},
	//反查行业
	getBusinessDetail:(id)=>{
		return httpTokenRequest({
			url: `/crm/business/detail?id=${id}`,
			method: 'get'
		},id)
	},
	//公司指标分类
	companyTarget:(data)=>{
		return httpTokenRequest({
			url: "/crm/targetclass/lazy-tree",
			method: 'get'
		},data)
	},
	//公司所有指标
	companyTargetByClass:(data)=>{
		return httpTokenRequest({
			url: "/crm/companytarget/getByTargetClassId",
			method: 'get'
		},data)
	},
	//公司详情
	getCompanyDetail:(data)=>{
		return httpTokenRequest({
			url: `/crm/company/detail?id=${data}`,
			method: 'get'
		},data)
	},
	//保存公司指标
	saveAllTarget:(data)=>{
		return httpTokenRequest({
			url: "/crm/companytarget/saveAll",
			method: 'post'
		},data)
	},
	//匹配政策
	getVirtualNum:(data)=>{
		return httpTokenRequest({
			url: `/companyPolicy/policiesByCompanyId?companyId=${data}`,
			method: 'get'
		},data)
	},
	//已报政策
	companyProject:(data)=>{
		return httpTokenRequest({
			url: "/policy/companyproject/list",
			method: 'get'
		},data)
	},
	// 根据项目查询公司
	getListByName:(data)=>{
		return httpTokenRequest({
			url: "/policy/companyproject/listByName",
			method: 'get'
		},data)
	},
	// 政策详情
	getPolicyDetail:(data)=>{
		return httpTokenRequest({
			url: "/policy/policy/detail",
			method: 'get'
		},data)
	},
	// 政策相关公司
	getByPolicyId:(data)=>{
		return httpTokenRequest({
			url: "/companyPolicy/companiesByPolicyId",
			method: 'get'
		},data)
	},
}
