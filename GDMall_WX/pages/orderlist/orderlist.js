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
      console.log(res);
      this.setData({
        order_list:res
      })
    })
  },
  // 查看订单清单
  toOrdertails:function(e){
    var order_info_id = order.getDataset(e,'id');
    // console.log(order_info_id);
    wx.navigateTo({
      url: '../orderdetails/orderdetails?order_info_id='+order_info_id,
    })
  },
  deleteOrder:function (e) {
    var order_info_id = order.getDataset(e,'id');
    order.deleteOrder(order_info_id,(res)=>{
      if(res.msg=='删除订单成功'){
        this.getOrderInfoList();
      }
    })
  },
  toPay:function(e){
    var order_id = order.getDataset(e, 'id');
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
            url: '../cart/cart',
          })
        }
      })
    })
  }


})