/**
 * Copyright (C) 2018-2019
 * All rights reserved, Designed By www.joolun.com
 * 注意：
 * 本软件为www.joolun.com开发研制，未经购买不得使用
 * 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
 * 一经发现盗用、分享等行为，将追究法律责任，后果自负
 */
const app = getApp()

Page({
  data: {
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    goodsCategory: [],
    load: true
  },
  onLoad() {
    // 在页面中定义插屏广告
    let interstitialAd = null
    // 在页面onLoad回调事件中创建插屏广告实例
    if (wx.createInterstitialAd) {
      interstitialAd = wx.createInterstitialAd({
        adUnitId: 'adunit-e7046daf3d8fdde5'
      })
      interstitialAd.onLoad(() => { })
      interstitialAd.onError((err) => { })
      interstitialAd.onClose(() => { })
    }
    // 在适合的场景显示插屏广告
    if (interstitialAd) {
      interstitialAd.show().catch((err) => {
        console.error(err)
      })
    }
    
    app.initPage()
      .then(res => {
        this.goodsCategoryGet()
      })
  },
  onShow() {
    //更新tabbar购物车数量
    wx.setTabBarBadge({
      index: 2,
      text: app.globalData.shoppingCartCount + ''
    })
  },
  goodsCategoryGet() {
	 let wxUser = app.globalData.wxUser
	 // console.log(wxUser)
    app.api.goodsCategoryGet({
		tenantId:wxUser.tenantId
	})
      .then(res => {
		  console.log(res.data)
        let goodsCategory = res.data
        this.setData({
          goodsCategory: goodsCategory
        })
      })
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
  },
  VerticalMain(e) {
    let that = this
    let list = this.data.goodsCategory
    let tabHeight = 0
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + i)
        view.fields({
          size: true
        }, data => {
          list[i].top = tabHeight
          tabHeight = tabHeight + data.height
          list[i].bottom = tabHeight
        }).exec()
      }
      that.setData({
        load: false,
        goodsCategory: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (i - 1) * 50,
          TabCur: i
        })
        return false
      }
    }
  }
})
