// pages/cart/cart.js

import { Cart } from './cart-model.js'

var cart = new Cart();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 'cartpage',  //底部导航栏参数
    //数据结构：以一组一组的数据来进行设定 
    checked: true,
    icon: {
      normal: '//img.yzcdn.cn/icon-normal.png',
      active: '//img.yzcdn.cn/icon-active.png'
    }
  
  },

  onChange(event) {
    this.setData({
      checked: event.detail
    });
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
  },

  
  
})