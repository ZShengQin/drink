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
    /**
     * 无任何操作,只是为了截断蒙层touchmove
     * 开发工具上仍可滚动,真机上不会
     */
    preventTouchMove(){
    },
    hideCard: function () {
      this.setData({
        isHidden: true
      });
    },
  }
})
