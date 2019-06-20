// pages/returnsorder/returnsorder.js

import {Order} from '../order/order-model.js'

var order = new Order();

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
    // 获取传来的订单id
    this.order_info_id = options.order_info_id
  },
  setReturnsNum:function(e){
    this.returns_num = e.detail.value
  },
  onSave:function(){
    // 保存用户退款订单号
    if (this.returns_num.length!=0){
      order.returnsOrder(this.order_info_id, this.returns_num,(res)=>{
        if (res.msg =='申请退款成功'){
          console.log('申请退货成功')
          wx.navigateTo({
            url: '../orderlist/orderlist',
          })
        }
      })
    }
  }
})