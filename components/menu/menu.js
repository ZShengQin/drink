// components/menu/menu.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    menuList: {
      type: Array,
      value: []
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
    changeIndex: function(e){
      console.log(e.currentTarget.dataset.index)
      this.triggerEvent("changeleftindex", { activeLeftIndex: e.currentTarget.dataset.index })
    }
  }
})
