// pages/release/release.js
const Api = require('../../global/API.js')
const Util = require('../../utils/util.js')

Page({
  data: {
    name: '',
    strategy: '',
    description: '',
    length: 0,
    files: [],

    //记录是第几次触底刷新网页分享内容
    count: 0,

    //用户没有输入完必要信息前按钮是disable的
    //用户点击分享后将按钮disable掉,防止重复点击
    disabledSubmit: true   
  },

  /**
   * btnState: 按钮是否可点击的状态
   * 使用util.js中的disabledBtn函数检测是否为可点击状态
   */
  typedName: function (e) {
    let btnState = Util.disableBtn(e.detail.value, this.data.strategy, this.data.description) ? true : false
    this.setData({ 
      name: e.detail.value,
      disabledSubmit: btnState
    })
  },
  typedStrategy: function (e) {
    let btnState = Util.disableBtn(this.data.name, e.detail.value, this.data.description) ? true : false
    this.setData({ 
      strategy: e.detail.value,
      disabledSubmit: btnState
    })
  },
  typingDescription: function (e) {
    let btnState = Util.disableBtn(this.data.name, this.data.strategy, e.detail.value) ? true : false
    this.setData({ 
      length: e.detail.value.length,
      description: e.detail.value,
      disabledSubmit: btnState
    })
  },
  typedDescription: function (e) {
    let btnState = Util.disableBtn(this.data.name, this.data.strategy, e.detail.value) ? true : false
    this.setData({ 
      description: e.detail.value,
      disabledSubmit: btnState
    })
  },

  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],   // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'],        // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id,  // 当前显示图片的http链接
      urls: this.data.files         // 需要预览的图片http链接列表
    })
  },

  submitShare: function (e) {
    console.log(this.data.files)
    //上传分享信息
    //先上传文字成功后再上传图片
    wx.request({
      url: Api.DOMAIN + '/strategy/share',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        name: this.data.name,
        strategy: this.data.strategy,
        description: this.data.description,
        picUrl: this.data.files[0]
      },
      success: res => {
        if (res.data.code == Api.SUCCESS) {
          //上传图片
          wx.uploadFile({
            url: Api.DOMAIN + '/strategy/share/img',
            filePath: this.data.files[0],
            name: 'file',
            success: res => {
              console.log(res)
              if(res.data.code == 0){
                //分享成功提示
                wx.showToast({
                  title: '分享成功',
                })
                //用户点击分享后将按钮disable掉,防止重复点击
                this.setData({
                  disabledSubmit: true
                })

                //休眠1秒让用户看到提示
                Util.sleep(1500)

                wx.navigateBack({ })
              }
            }
          })

        } else {
          wx.showModal({
            title: '未知错误',
            content: '分享失败，请重新尝试',
            showCancel: false
          })
        }
      },
      fail: () => {
        wx.showModal({
          title: 'Error!',
          content: '请检查网络设置！',
          showCancel: false
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  }
  
})