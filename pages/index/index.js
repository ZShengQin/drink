//index.js
//获取应用实例
const Api = require('../../global/API.js')
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    recommendProduct: {},
    saying: '',
    isShowCard: false
  },

  //点击显示卡片式详细介绍
  tapShowCard: function (e) {
    this.setData({
      isShowCard: true
    })
    console.log(this.data.cardContent)
  },

  navRelease: function(){
    wx.navigateTo({
      url: '/pages/release/release',
    })
  },

  navStrategy: function(){
    wx.switchTab({
      url: '/pages/strategy/strategy',
    })
  },

  onLoad: function () {
    wx.request({
      url: Api.DOMAIN + '/recommend',
      success: res => {
        console.log(res)
        this.setData({
          recommendProduct: res.data,
        })
      }
    })
    wx.request({
      url: Api.DOMAIN + '/saying',
      success: res => {
        this.setData({
          saying: res.data.saying
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(){
    return {
      title: '左手咖啡,右手生活'
    }
  }

})
