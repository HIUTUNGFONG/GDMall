// pages/card/card.js

import { Card } from './card-model.js'

var card = new Card();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    card.getUserCardList((res) => {
      console.log(res)
      this.setData({
        card_list: res.card_list
      })
    })
  },

 
})