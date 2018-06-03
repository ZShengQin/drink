// pages/about/about.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contacts: [
      { 
        nickname: 'Qin',
        firstName: 'Zhang', 
        qq: '1309075777' 
      },
      {
        nickname: 'Bear', 
        firstName: 'Xiong', 
        qq: '656796584'
      }
    ]
  },

  copyContent: function(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.content,
      success: () => {
        wx.showToast({
          title: '复制成功',
        })
      },
      fail: () => {
        wx.showToast({
          title: '复制失败',
          icon: 'none'
        })
      }
    })
    
  },

  userFeedback: function(e) {
    wx.navigateTo({
      url: '../feedback/feedback',
    })
  }
})