// const baseUrl = 'https://freesia.mynatapp.cc'; 
// const baseUrl = 'https://jazz.mynatapp.cc'
const baseUrl = 'https://mall.program66.com'
const httpRequest = (opts, data) => {
	let httpDefaultOpts = {
		url: baseUrl + opts.url,
		data: data,
		method: opts.method,
		header: opts.method == 'get' ? {
			'X-Requested-With': 'XMLHttpRequest',
			"Accept": "application/json",
			'Authorization': 'Basic YWRtaW46YWRtaW4=',
			"Content-Type": "application/json; charset=UTF-8"
		} : {
			'X-Requested-With': 'XMLHttpRequest',
			'Authorization': 'Basic YWRtaW46YWRtaW4=',
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		},
		dataType: 'json',
	}

	let promise = new Promise(function(resolve, reject) {
		uni.showLoading({
			title: '正在登录'
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
			'Authorization': "Bearer " + token,
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		} : {
			'X-Requested-With': 'XMLHttpRequest',
			'Authorization': "Bearer " + token,
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
			url: '/auth/oauth/token',
			method: 'post'
		}, data)
	},
	userInfo: (data) => { //用户信息
		return httpTokenRequest({
			url: '/admin/user/info',
			method: 'get'
		}, data)
	},
	// questionInfo:(data) =>{ // 报价信息
	// 	return httpTokenRequest({
	// 		url: '/mall/orderinfo',
	// 		method: 'post'
	// 	},data)
	// },
	postquestionInfo: (data) => { // 申请报价
		return httpTokenRequest({
			url: '/mall/orderitem/saveAll',
			method: 'post'
		}, data)
	},
	orderInfo: (data) => { // 订单信息
		return httpTokenRequest({
			url: `/mall/orderinfo/page?current=${data.current}&size=${data.size}`,
			method: 'get'
		}, data)
	},
	searchOrder: (data) => { //根据订单号搜索
		return httpTokenRequest({
			url: `/mall/orderinfo/page?orderNo=${data.orderNo}`,
			method: 'get'
		}, data)
	},
	searchName: (data) => { //根据商品名搜索
		return httpTokenRequest({
			url: `/mall/goodsspu/page?name=${data.name}`,
			method: 'get'
		}, data)
	},
	orderInfoOne: (data) => { // 单个的订单信息
		return httpTokenRequest({
			url: '/mall/orderitem/page?orderId=' + data.orderId,
			method: 'get'
		}, data)
	},
	getPage: (data) => { //商品信息
		return httpTokenRequest({
			url: `/mall/goodsspu/page?current=${data.current}&size=${data.size}`,
			method: 'get',
		})
	},
	getallGoods: (data) => {
		return httpTokenRequest({
			url: '/mall/goodsspu/page',
			method: 'get',
		},data)
	},
	// getAllGoods: (data) => { //按规格检索全部商品
	// 	return httpTokenRequest({
	// 		url: `/mall/goodsspu/page?shelf=${data.shelf}`,
	// 		method: 'get',
	// 	})
	// },
	getAllGoodsss: (data) => { //按规格检索全部商品
		return httpTokenRequest({
			url: `/mall/goodsspu/page?specType=${data.specType}`,
			method: 'get',
		})
	},
	getOneGoods: (data) => { //单个商品信息
		return httpTokenRequest({
			url: '/mall/goodsspu/' + data.id,
			method: 'get',
		})
	},
	getOne: (data) => { //单个订单信息
		return httpTokenRequest({
			url: '/mall/orderinfo/' + data.id,
			method: 'get',
		})
	},
	shangemen: (data) => {
		return httpTokenRequest({
			url: '/mall/orderinfo/takegoods/' + data.id,
			method: 'put',
		}, data)
	},
	getOneByOrderNo: (data) => {
		return httpTokenRequest({
			url: `/mall/orderinfo/page?orderNo=${data.orderNo}`,
			method: 'get',
		})
	},
	gethistoryment: (data) => { //订单账期
		return httpTokenRequest({
			url: `/mall/historicalsettlement/page?orderNo=${data.orderNo}`,
			method: 'get',
		})
	},
	puthistoryment: (data) => { //订单账期
		return httpTokenRequest({
			url: "/mall/historicalsettlement",
			method: 'put',
		}, data)
	},
	settleAll: (data) => { //全部结清
		return httpTokenRequest({
			url: `/mall/orderinfo/settleComplete?orderNo=${data.orderNO}`,
			method: 'get',
		}, data)
	},
	postoneOrder: (data) => { //报价信息选择
		return httpTokenRequest({
			url: '/mall/orderinfo',
			method: 'put',
		}, data)
	},
	getgoodscategory: (data) => { //商品类目
		return httpTokenRequest({
			url: '/mall/goodscategory/tree',
			method: 'get',
		})
	},
	getgoodscategorymore: (data) => { //标准分类
		return httpTokenRequest({
			url: '/mall/goodscategorymore/tree',
			method: 'get',
		})
	},
	getcategorymore: (data) => { //商品标准名
		return httpTokenRequest({
			url: '/mall/goodscategorymore/list',
			method: 'get',
		})
	},
	getgoodsspec: (data) => { //商品规格一级
		return httpTokenRequest({
			url: '/mall/goodsspec/list',
			method: 'get',
		})
	},
	specValueList:()=>{ //规格值
		return httpTokenRequest({
			url: "/mall/goodsspecvalue/list",
			method: 'get',
		})
	},
	getgoodsspecTwo: (data) => { //商品规格二级
		return httpTokenRequest({
			url: '/mall/goodsspecvalue/list?specId=' + data.id,
			method: 'get',
		})
	},
	getdeliveryplace: (data) => { //发货地选择
		return httpTokenRequest({
			url: '/mall/deliveryplace/page',
			method: 'get',
		})
	},
	getfreighttemplat: (data) => { //运费模板
		return httpTokenRequest({
			url: '/mall/freighttemplat/page',
			method: 'get',
		})
	},
	postgoods: (data) => { //发布商品
		return httpTokenRequest({
			url: '/mall/goodsspu',
			method: 'post',
		}, data)
	},
	putgoods: (data) => { //修改商品
		return httpTokenRequest({
			url: '/mall/goodsspu',
			method: 'put',
		}, data)
	},
	uploadImage: (data) => { //上传图片
		return httpTokenRequest({
			url: '/admin/file/uploads',
			method: 'post',
		}, data)
	},
	putshelfgoods: (data) => { //上下架商品
		return httpTokenRequest({
			url: `/mall/goodsspu/shelf?shelf=${data.shelf}&ids=[${data.ids}]`,
			method: 'put',
			data: data
		})
	},
	deletegood: (data) => { //删除商品
		return httpTokenRequest({
			url: '/mall/goodsspu/' + data.id,
			method: 'delete'
		})
	},
	wuliuInfo: (data) => { //物流选择
		return httpTokenRequest({
			url: '/mall/orderlogistics/dict/LOGISTICS',
			method: 'get',
		})
	},
	fillwuliu: (data) => { //物流填写
		return httpTokenRequest({
			url: '/mall/orderlogistics/dict/LOGISTICS',
			method: 'post',
		}, data)
	},
	bankInfo: (data) => { //开户行填写
		return httpTokenRequest({
			url: '/weixin/wxapp/list',
			method: 'get',
		}, data)
	},
	putBankInfo: (data) => { //开户行填写
		return httpTokenRequest({
			url: '/weixin/wxapp',
			method: 'put',
		}, data)
	},
	goodsAppraisesPage: (data) => { //商品评价列表
		return httpTokenRequest({
			url: '/mall/goodsappraises/page',
			method: 'get',
		}, data)
	},
	mallUser: (data) => { //商城用户
		return httpTokenRequest({
			url: '/mall/userinfo/page',
			method: 'get',
		}, data)
	},
	getNotice: (data) => { //获取公告
		return httpTokenRequest({
			url: '/mall/noticeitem/page',
			method: 'get',
		}, data)
	},
	addNotice: (data) => { //新增公告
		return httpTokenRequest({
			url: '/mall/noticeitem',
			method: 'post',
		}, data)
	},
	delNotice: (data) => { //删除公告
		return httpTokenRequest({
			url: '/mall/noticeitem/'+data.id,
			method: 'delete',
		}, data)
	},
	changNotice: (data) => { //编辑公告
		return httpTokenRequest({
			url: '/mall/noticeitem/'+data.id,
			method: 'get',
		}, data)
	},
	enableNotice: (data) => { //是否启用
		return httpTokenRequest({
			url: '/mall/noticeitem',
			method: 'put',
		}, data)
	},
	getAppid: (data) => {
		return httpTokenRequest({
			url: '/weixin/wxapp/list?appType=1',
			method: 'get',
		}, data)
	}
}
