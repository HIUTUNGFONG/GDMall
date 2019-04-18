//index.js
//获取应用实例
const app = getApp()

Page({
  data: {

    vp:true,  //视频或图片栏控制显示参数
    showManType:false

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    showManType: (options.showManType == "true" ? true : false)
  
  },
  on_mw_1: function () {
    var that = this;
    that.setData({
      showManType: (!that.data.showManType)
    })

  }

  
})
