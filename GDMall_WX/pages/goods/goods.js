// pages/goods/goods.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    show: false,
    overlay:false,
    popup_data:''
  },
  

  /**
   * 组件的方法列表
   */
  methods: {
    onShowPopup: function () {
      // 显示侧边栏,查询类别和分类
      this.setData({
        show: true
      })
    },
    onClose() {
      this.setData({ show: false });
    },
    onOverlay() {
      this.setData({ overlay: false });
    }
  }
})
