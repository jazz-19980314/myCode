// pages/product/publicity/index.js
const app = getApp()
Page({
	// onShareAppMessage() {
	//     return {
	//       title: 'video',
	//       path: 'page/component/pages/video/video'
	//     }
	//   },
  /**
   * 页面的初始数据
   */
  data: {
	list:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	this.pubilctyVideo()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  enterdetail(e){
	  var index = e.currentTarget.dataset.index
	  wx.navigateTo({
		  url:`/pages/product/videodetial/index?index=${index}`
	  })
  },
  onReady: function () {
	 this.videoContext = wx.createVideoContext('myVideo')
  },
  pubilctyVideo(){
	  app.api.pubilcty({
		  type:1
	  }).then(res=>{
		  this.setData({
		  	list:res.data.records,
		  })
		  console.log(this.data.list)
	  })
  },
	 bindButtonTap() {
	    const that = this
	    wx.chooseVideo({
	      sourceType: ['album', 'camera'],
	      maxDuration: 60,
	      camera: ['front', 'back'],
	      success(res) {
	        that.setData({
	          src: res.tempFilePath
	        })
	      }
	    })
	  },
	
	  bindVideoEnterPictureInPicture() {
	    console.log('进入小窗模式')
	  },
	
	  bindVideoLeavePictureInPicture() {
	    console.log('退出小窗模式')
	  },
	
	  bindPlayVideo() {
	    console.log('1')
	    this.videoContext.play()
	  },
	  bindSendDanmu() {
	    this.videoContext.sendDanmu({
	      text: this.inputValue,
	      color: getRandomColor()
	    })
	  },
	
	  videoErrorCallback(e) {
	    console.log('视频错误信息:')
	    console.log(e.detail.errMsg)
	  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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