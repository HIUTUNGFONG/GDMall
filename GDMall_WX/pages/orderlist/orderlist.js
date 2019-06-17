// pages/orderlist/orderlist.js
import {Order} from '../order/order-model.js'
var order = new Order();

Page({

  data: {
    active: 0
  },
  onLoad: function (options) {
    // 获取订单信息
    order.getOrderInfoList((res)=>{
      console.log(res)
    })
    
  },


  // onChange(event) {
    // wx.showToast({
    //   title: `切换到标签 ${event.detail.index + 1}`,
    //   icon: 'none'
    // });
  // }

})