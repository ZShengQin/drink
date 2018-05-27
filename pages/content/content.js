const Util = require('../../utils/util.js')
const sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
const app = getApp()

Page({
  data: {
    tabs: ["Starbucks", "一点点", "Hey Tea", "更多"],
    sliderOffset: 0     ,
    sliderLeft: 0,
    activeIndex: 0,
    activeLeftIndex: 0,

    menuList: [
      ['全部','咖啡', '星冰乐', '茶', '其他'],
      ['全部','找好茶', '找奶茶', '找口感', '找新鲜'],
      ['全部','茗茶', '当季限定', '草莓家族', '满杯水果', '热饮推荐']
    ],
    
    proList: [],

    isShowCard: false,
    cardContent: {}
  }, 

  //顶部导航栏切换
  tapClick: function (e) {
    const that = this
    const index = e.detail.activeIndex
    this.setData({
      activeIndex: index
    })
    //将index值转换为url中对应字符串
    let urlOpt = Util.convertIndexToString(index)
    wx.request({
      url: app.globalData.API + urlOpt,
      success: res => {
        console.log(res)
        that.setData({
          proList: res.data
        })
      }
    })
  },

  //点击左侧menu显示不同类目
  changeLeftIndex: function(e){
    const that = this
    //请求index_leftIndex下的商品列表
    const index = this.data.activeIndex
    const leftIndex = e.detail.activeLeftIndex
    this.setData({
      activeLeftIndex: leftIndex
    })
    let urlOpt = Util.convertIndexToString(index)
    if(leftIndex != 0){
      urlOpt += '/' + leftIndex
    }
    wx.request({
      url: app.globalData.API + urlOpt,
      success: res => {
        that.setData({
          proList: res.data
        })
      }
    })
  },

  tapShowCard: function(e) {
    this.setData({
      cardContent: this.data.proList[e.detail.proIndex],
      isShowCard: true
    })
    console.log(this.data.cardContent)
  },

  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    
    wx.request({
      url: app.globalData.API + '/coffee',
      success: res => {
        console.log(res)
        this.setData({
          proList: res.data
        })
      }
    })
  },
 
});