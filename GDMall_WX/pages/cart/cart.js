// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 'cartpage',  //底部导航栏参数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 底部导航栏跳转
  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
    console.log(detail.key)
    var tourl = ''
    if (detail.key == 'indexpage') {
      tourl = '../index/index'
    } else if (detail.key == 'goodspage') {
      tourl = '../goods/goods'
    } else if (detail.key == 'cartpage') {
      tourl = '../cart/cart'
    } else if (detail.key == 'userpage') {
      tourl = '../user/user'
    }
    wx.redirectTo({
      url: tourl
    })
  }
})