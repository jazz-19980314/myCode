// pages/product/publicity/index.js
const WxParse = require('../../../public/wxParse/wxParse.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
	recommendslist:[{
		title:"关于建筑施工方面的八条知识，全干货不看后悔！",
		rename:"科技文章",
		date:"2020-4-29",
		viewsnumber:'857.2',
		videourl:"../../../public/img/index_img/jianzhu.jpg"
	}],
	list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	this.pubilctyVideo()
  },
enterdetail(e){
		  var index = e.currentTarget.dataset.index
		  wx.navigateTo({
			  url:`/pages/product/knowDetail/index?index=${index}`
		  })
	},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
	pubilctyVideo(){
		  app.api.pubilcty({
			  type:2
		  }).then(res=>{
			  // let goodsSpu = res.data.records
			  this.setData({
				  list:res.data.records
			  })
			  // WxParse.wxParse('content', 'html', goodsSpu[0].content, this, 0)
			  // console.log(res.data)
		  })
	},
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})