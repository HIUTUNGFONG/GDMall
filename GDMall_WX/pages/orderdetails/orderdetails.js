// pages/orderdetails/orderdetails.js

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
    this.order_info_id = options.order_info_id
    console.log(this.order_info_id)
    if (this.order_info_id != undefined) {
      order.getOrderInfoListById(this.order_info_id,(res)=>{
        console.log(res)
        this.setData({
          order_info:res,
          order_list: res.order_list
        })
      })
    }
  },


  deleteOrder: function (e) {
    order.deleteOrder(this.order_info_id, (res) => {
      if (res.msg == '删除订单成功') {
        this.getOrderInfoList();
      }
    })
  },
  onConfirm: function (e) {
    var order_info_id = order.getDataset(e, 'id');
    order.confirmOrder(this.order_info_id, (res) => {
      if (res.msg == '订单已确认') {
        this.getOrderInfoList();
      }
    })
  },
  toReturnsOrder: function (e) {
    wx.navigateTo({
      url: '../returnsorder/returnsorder?order_info_id=' + this.order_info_id,
    })

  },
  toPay: function (e) {
    var order_id = order.getDataset(e, 'orderid');
    order.toPay(order_id, (res) => {
      console.log(res)
      wx.requestPayment({
        timeStamp: res.timeStamp,
        nonceStr: res.nonceStr,
        package: res.package,
        signType: 'MD5',
        paySign: res.paySign,
        success(res) {
          console.log('支付成功')
          wx.showToast({
            title: '支付成功',
            icon: 'success',
            duration: 1000
          })
          wx.navigateTo({
            url: '../orderlist/orderlist',
          })
        },
        fail(res) {
          // 取消付款，跳转到订单详情页
          wx.navigateTo({
            url: '../orderdetails/orderdetails?order_info_id=' + this.order_info_id,
          })
        }
      })
    })
  }

})