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
    this.order_price = wx.getStorageSync('order_price')
    console.log(this.params)
    if(this.params=='on'){
      this.setData({
        cardClick:'on'
      })
    }

    // 获取当前时间戳
    this.now_time = Date.parse(new Date());

    card.getUserCardList((res) => {
      console.log(res.card_list)
      // 有效券
      var card_list_1 = [];
      // 无效券
      var card_list_2 = [];
      if (this.params=='on'){
        for (var i = 0; i < res.card_list.length; i++) {
          // 获取有效期时间戳
          var validity_time = new Date(res.card_list[i].card[0].validity).getTime();
          // 获取使用金额
          var min_price = res.card_list[i].card[0].min_price;
          if (validity_time >= this.now_time&&this.order_price>=min_price) {
            var temp = [];
            temp.push(res.card_list[i].card);
            temp.push(res.card_list[i].card_token);
            card_list_1.push(temp);
          } else {
            var temp = [];
            temp.push(res.card_list[i].card);
            temp.push(res.card_list[i].card_token);
            card_list_2.push(temp);
          }
        }
      }else{
        for (var i = 0; i < res.card_list.length; i++) {
          // 获取有效期时间戳
          var validity_time = new Date(res.card_list[i].card[0].validity).getTime();
          if (validity_time >= this.now_time) {
            var temp = [];
            temp.push(res.card_list[i].card);
            temp.push(res.card_list[i].card_token);
            card_list_1.push(temp);
          } else {
            var temp = [];
            temp.push(res.card_list[i].card);
            temp.push(res.card_list[i].card_token);
            card_list_2.push(temp);
          }
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
  toOrder:function(e){
    var token = e.currentTarget.dataset.token;
    var card_price = e.currentTarget.dataset.cardprice;
    wx.setStorageSync('card_key',token);
    wx.setStorageSync('card_price', card_price);
    wx.navigateTo({
      url: '../order/order?card_state=true',
    })
  }
})