// components/card/card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isHidden: {
      type: Number,
      value: true
    },
    content: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    hideCard: function () {
      this.setData({
        isHidden: true
      });
    },
  }
})
