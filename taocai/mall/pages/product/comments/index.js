// pages/product/comments/index.js
// const util = require('../../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
	page: {
	  searchCount: false,
	  current: 1,
	  size: 10,
	  ascs: '',//升序字段
	  descs: 'create_time'
	},
	parameter: {
	  
	},
	loadmore: true,
	goodsAppraises: [],
	currentss:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	app.initPage()
	  .then(res => {
	    this.goodsAppraisesPage()
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
goodsAppraisesPage() {
    app.api.goodsAppraisesPage(Object.assign(
      {},
      this.data.page,
      // util.filterForm(this.data.parameter)
    ))
      .then(res => {
        let goodsAppraises = res.data.records
        this.setData({
          goodsAppraises: [...this.data.goodsAppraises, ...goodsAppraises]
        })
		// console.log(this.data.goodsAppraises)
        if (goodsAppraises.length < this.data.page.size) {
          this.setData({
            loadmore: false
          })
        }
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
  onReachBottom() {
    if (this.data.loadmore) {
      this.setData({
        ['page.current']: this.data.page.current + 1
      })
      this.goodsAppraisesPage()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})