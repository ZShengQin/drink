// components/topnav/topnav.js
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs: {
      type: Array,
      value: [],
    },
    activeIndex: {
      type: Number,
      value: 0
    },
    sliderOffset: {
      type: Number,
      value: 0
    },
    sliderLeft: {
      type: Number,
      value: 0
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
    tapClick: function(e){
      this.setData({
        sliderOffset: e.currentTarget.offsetLeft,
        activeIndex: e.currentTarget.id
      })
      //回传activeIndex的数据
      this.triggerEvent("mytapclick", {activeIndex: this.data.activeIndex})
    }
  }
})
