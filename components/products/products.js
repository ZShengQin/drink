// components/products/products.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    proList: {
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
    tapShowCard: function(e){
      console.log(e.currentTarget.dataset.index)
      this.triggerEvent("tapshowcard", { proIndex: e.currentTarget.dataset.index})
    }
  }
})
