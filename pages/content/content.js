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
      ['咖啡', '星冰乐', '茶', '其他'],
      ['找好茶', '找奶茶', '找口感', '找新鲜'],
      ['茗茶', '当季限定', '草莓家族', '满杯水果', '热饮推荐']
    ],
    
    proList: []
  },

  tapClick: function (e) {
    this.setData({
      activeIndex: e.detail.activeIndex
    })
  },

  changeLeftIndex: function(e){
    //请求index_leftIndex下的商品列表
    this.setData({
      activeLeftIndex: e.detail.activeLeftIndex,
    })
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