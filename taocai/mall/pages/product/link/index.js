// pages/product/link/index.js
// const WxParse = require('../../../public/wxParse/wxParse.js')
const app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		list: [
			// {
			// 	bussicon: '../../../public/img/index_img/yqlj4.png',
			// 	bussname: '常州市瑾源工程照明有限公司',
			// 	bussinfo: '专注于照明灯具及配件、高杆灯、太阳能路灯、庭院灯、景观灯、草坪灯、LED投光灯、金属材料等材料的销售',
			// },{
			// 	bussicon: '../../../public/img/index_img/yqlj2.png',
			// 	bussname: '江西汉光电缆股份有限公司',
			// 	bussinfo: '专注于电线、电缆、低压电器、室内加热器、换气扇、PVC水暖洁具、电器附件、锁具制造等的销售。'
			// }, {
			// 	bussicon: '../../../public/img/index_img/yqlj7.png',
			// 	bussname: '合肥天瑶电气有限公司',
			// 	bussinfo: '特别注重新技术、新产品的引进和开发，防火阻燃桥架、铝合金桥架等系列。'
			// }, {
			// 	bussicon: '../../../public/img/index_img/yqlj8.png',
			// 	bussname: '合肥万瑞建材有限公司',
			// 	bussinfo: '公司主要经营钢材、建材（砂石除外）、金属材料、钢板、卷板、角钢等材料的批发及销售。'
			// },{
			// 	bussicon: '../../../public/img/index_img/yqlj1.png',
			// 	bussname: '合肥佰利恒石业有限公司',
			// 	bussinfo: '专注于石材、大理石、花岗岩、装饰材料、建材（不含石灰、黄沙、石子）等的销售。'
			// },
			//  {
			// 	bussicon: '../../../public/img/index_img/yqlj3.png',
			// 	bussname: '六安市经纬保温防水材料有限公司',
			// 	bussinfo: '专注于保温材料、防水材料加工、以及销售。'
			// },  {
			// 	bussicon: '../../../public/img/index_img/yqlj5.png',
			// 	bussname: '安徽启诚电气科技有限公司 ',
			// 	bussinfo: '专注于电力电气设备制造及智能化控制系统研发设计。'
			// },
			// {
			// 	bussicon: '../../../public/img/index_img/yqlj6.png',
			// 	bussname: '山东天汇防水建材有限公司',
			// 	bussinfo: '专业从事建材产品经营研发、生产、销售为一体的高科技生产贸易型企业。'
			// },  
			{
				bussicon: '../../../public/img/index_img/yqlj5.png',
				bussname: '安徽中科新软人工智能科技有限公司 ',
				bussinfo: '专注人工智能技术;信息技术;云计算技术领域内的技术咨询;云软件服务的研发设计。'
			},
			{
				bussicon: '../../../public/img/index_img/yqlj6.png',
				bussname: '安徽翼装科技有限公司',
				bussinfo: '专注于提供建材领域电商一站式解决方案。'
			}
		],
		marqueePace: 1, //滚动速度
		marqueeDistance: 0, //初始滚动距离
		marquee_margin: 30,
		size: 14,
		interval: 20, // 时间间隔
		id: "1277143324143915010"
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		// this.goodsGet(this.data.id)
	},
	// goodsGet(id) {
	//   app.api.goodsGet(id)
	//     .then(res => {
	//       let goodsSpu = res.data
	//       // this.setData({
	//       //   goodsSpu: goodsSpu
	//       // })
	// 	  console.log(res)
	//       //html转wxml
	//       WxParse.wxParse('description', 'html', goodsSpu.description, this, 0)
	//     })
	// },
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},
	handelClick(e) {
		if (e.currentTarget.dataset.index == '0') {
			wx.navigateTo({
				url: "/pages/product/linkDetail/index"
			})
		} else if (e.currentTarget.dataset.index == '1') {
			wx.navigateTo({
				url: "/pages/product/linkDetail2/index"
			})
		} else {
			wx.showToast({
				icon: "none",
				title: '正在建设中。。。'
			})
		}
	},
	/**
	 * 生命周期函数--监听页面显示
	 */
	// onShow: function () {
	//     var that = this;
	//     var length = that.data.list[6].bussinfo.length * that.data.size;//文字长度
	//     var windowWidth = wx.getSystemInfoSync().windowWidth;// 屏幕宽度
	//     //console.log(length,windowWidth);
	//     that.setData({
	//       length: length,
	//       windowWidth: windowWidth
	//     });
	//     that.scrolltxt();// 第一个字消失后立即从右边出现
	//   },
	//  scrolltxt: function () {
	//     var that = this;
	//     var length = that.data.length;//滚动文字的宽度
	//     var windowWidth = that.data.windowWidth;//屏幕宽度
	//     if (length > windowWidth){
	//       var interval = setInterval(function () {
	//         var maxscrollwidth = length + that.data.marquee_margin;//滚动的最大宽度，文字宽度+间距，如果需要一行文字滚完后再显示第二行可以修改marquee_margin值等于windowWidth即可
	//         var crentleft = that.data.marqueeDistance;
	//         if (crentleft < maxscrollwidth) {//判断是否滚动到最大宽度
	//           that.setData({
	//             marqueeDistance: crentleft + that.data.marqueePace
	//           })
	//         }
	//         else {
	//           //console.log("替换");
	//           that.setData({
	//             marqueeDistance: 0 // 直接重新滚动
	//           });
	//           clearInterval(interval);
	//           that.scrolltxt();
	//         }
	//       }, that.data.interval);
	//     }
	//     else{
	//       that.setData({ marquee_margin:"1000"});//只显示一条不滚动右边间距加大，防止重复显示
	//     } 
	//   },
	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
})
