// pages/order/order.js

import { Goods } from '../goods/goods-model.js'
import { Address } from '../address/address-model.js'

var address = new Address();
var goods = new Goods();

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
    // 获取缓存中的地址
    this.address = wx.getStorageSync('address')
    console.log(this.address)
    if(this.address==''){

    // 获取用户地址
    address.getAddressList((res)=>{
      console.log(res)
      this.address_list = res.address_list
      for(var i=0;i<this.address_list.length;i++){
        if (this.address_list[i].is_default==true){
          this.setData({
            address:this.address_list[i]
          })
        }
      }
    })
    }else{
      this.setData({
        address:this.address
      })
      wx.setStorageSync('address', '')
    }

  


    // 获取缓存中选中的商品信息
    this.commodity_list = wx.getStorageSync('commodity_list');
    this.count = 0;
    this.sum = 0;
    for(var i=0;i<this.commodity_list.length;i++){
      this.count+=this.commodity_list[i].num;
      this.sum += this.commodity_list[i].num * this.commodity_list[i].price;
    }
    console.log(this.count)
    console.log(this.sum)
    // console.log(this.commodity_list)
    this.setData({
      commodity_list:this.commodity_list,
      count:this.count,
      sum:this.sum.toFixed(2),
      sums: this.sum.toFixed(2)*100
    })



  },
  selectAddress:function(){
    wx.setStorageSync('toOrder', 'click')
    wx.navigateTo({
      url: '../address/address',
    })
  },
  onSubmit:function(){
    // 获取支付签名信息
    
    wx.requestPayment({
      timeStamp: '',
      nonceStr: '',
      package: '',
      signType: 'MD5',
      paySign: '',
      success(res) { },
      fail(res) { }
    })
  }


})