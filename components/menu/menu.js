// components/menu/menu.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    menuList: {
      type: Array,
      value: []
    },
    activeIndex: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    activeIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeIndex: function(e){
      this.setData({
        activeIndex: e.currentTarget.dataset.index
      })
      this.triggerEvent("changeleftindex", { activeLeftIndex: e.currentTarget.dataset.index })
    }
  }

})
