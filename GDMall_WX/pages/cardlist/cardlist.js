// pages/cardlist/cardlist.js

import {Card} from '../card/card-model.js'

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
    card.getCardList((res)=>{
      console.log(res)
      this.setData({
        card_list:res.card_list
      })
    })
  },
  addCard:function(e){
    // 获取card_id
    var card_id = card.getDataset(e,'id');
    console.log(card_id)
    card.addCard(card_id,(res)=>{
      console.log(res)
    })
  },

 
})