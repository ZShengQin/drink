const Api = require('../../global/API.js')
const sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
const app = getApp()

Page({
  data: {
    tabs: ["Starbucks", "一点点", "网友分享"],
    sliderOffset: 0     ,
    sliderLeft: 0,
    activeIndex: 0,
    activeLeftIndex: 0,

    menuList: [
      ['全部', '咖啡', '星冰乐', '其他'],
      ['全部', '找奶茶', '找好茶', '找新鲜'],
      ['全部']
    ],
    
    count: 0,
    proList: [],
    showNomore: false,

    isShowCard: false,
    cardContent: {}
  }, 

  //顶部导航栏切换
  tapClick: function (e) {
    const index = e.detail.activeIndex
    this.setData({
      activeIndex: index,
      activeLeftIndex: 0
    })
    //将index值转换为url中对应字符串
    if(index !== 2){
      wx.request({
        url: Api.DOMAIN + '/strategy/' + index,
        success: res => {
          console.log(res)
          this.setData({
            proList: res.data
          })
        }
      })
    } else {
      wx.request({
        url: Api.DOMAIN + '/strategy/share',
        data: { 
          count: this.data.count
        },
        success: res => {
          console.log(res)
          this.setData({
            count: this.data.count++,
            proList: res.data
          })
        }
      })
    }
  },

  //点击左侧menu显示不同类目
  changeLeftIndex: function(e){
    //请求index_leftIndex下的商品列表
    const index = this.data.activeIndex
    const leftIndex = e.detail.activeLeftIndex
    this.setData({
      activeLeftIndex: leftIndex
    })
    //如果leftIndex是0, 则请求的该nav类目下所有产品
    let urlOpt = index + (leftIndex ? '/' + leftIndex : '')
    wx.request({
      url: Api.DOMAIN + '/strategy/' + urlOpt,
      success: res => {
        this.setData({
          proList: res.data
        })
        
      }
    })
  },

  //点击显示卡片式详细介绍
  tapShowCard: function(e) {
    this.setData({
      cardContent: this.data.proList[e.detail.proIndex],
      isShowCard: true
    })
    console.log(this.data.cardContent)
  },

  onLoad: function () {
    wx.getSystemInfo({
      success: res => {
        this.setData({
          sliderLeft: (res.windowWidth / this.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / this.data.tabs.length * this.data.activeIndex
        });
      }
    });
    wx.request({
      url: Api.DOMAIN + '/strategy/0',
      success: res => {
        console.log(res)
        this.setData({
          proList: res.data
        })
      }
    })
  },

  onReachBottom: function(){
    if(this.data.activeIndex == 2){
      let count = this.data.count++
      this.setData({
        count: count
      })
      wx.request({
        url: Api.DOMAIN + '/strategy/share',
        data: {
          count: this.data.count
        },
        success: res => {
          if(res.data == []){
            this.setData({
              showNomore: true
            })
          } else {
            let proList = this.data.proList.concat(res.data)
            this.setData({
              proList: proList
            })
          }
        }
      })
    }
  },

  onShareAppMessage: function () {
    return {
      title: '星巴克一点点攻略!'
    }
  }
 
});