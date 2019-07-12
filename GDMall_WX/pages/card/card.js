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

    this.params = wx.getStorageSync('cardClick')
    console.log(this.params)
    if(this.params=='on'){
      this.setData({
        cardClick:'on'
      })
    }

    // 获取当前时间戳
    this.now_time = Date.parse(new Date());

    card.getUserCardList((res) => {
      // console.log(res.card_list)
      // 有效券
      var card_list_1 = [];
      // 无效券
      var card_list_2 = [];
      for(var i=0;i<res.card_list.length;i++){
        // 获取有效期时间戳
        var validity_time = new Date(res.card_list[i][0].validity).getTime();
        if (validity_time>=this.now_time){
          card_list_1.push(res.card_list[i])
        }else{
          card_list_2.push(res.card_list[i])
        }
      }
      this.setData({
        card_list_1: card_list_1,
        card_list_2: card_list_2
      })
      
      
    })
  },
  toGoods:function(){
    wx.navigateTo({
      url: '../goods/goods',
    })
  },
  toOrder:function(){
    console.log('ttt')
  }
})