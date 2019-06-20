// pages/orderlist/orderlist.js
import {Order} from '../order/order-model.js'
var order = new Order();

Page({

  data: {
    
  },
  onLoad: function (options) {
    // 获取订单信息
    if (options.select==undefined){
      this.getOrderInfoList()
      this.setData({
        active:0
      })
    }else{
      var order_list = this.getOrderListByState(options.select-1);
      this.setData({
        active:options.select,
        order_list:order_list
      })
    }
  },


  onChange(event) {


    if (event.detail.index==0){
      // 获取订单信息
      this.getOrderInfoList();
    }else {
      this.getOrderListByState(event.detail.index-1);
    }
  },
  getOrderListByState: function(state){
    var data_list = []
    order.getOrderInfoList((res)=>{
      for (var i = 0; i < res.length; i++) {
        if (res[i].state == state) {
          data_list.push(res[i])
        }
      }
      this.setData({
        order_list:data_list
      })
    })
  },
  getOrderInfoList:function(){
    order.getOrderInfoList((res)=>{
      console.log(res)
      this.setData({
        order_list:res
      })
    })
  },
  toOrdertails:function(e){
    var order_info_id = order.getDataset(e,'id')
    console.log(order_info_id)
    wx.navigateTo({
      url: '../orderdetails/orderdetails?order_info_id='+order_info_id,
    })
  }


})