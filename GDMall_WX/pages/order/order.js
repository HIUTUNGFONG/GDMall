// pages/order/order.js

import { Goods } from '../goods/goods-model.js'
import { Address } from '../address/address-model.js'
import { Order } from './order-model.js'

var address = new Address();
var goods = new Goods();
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
    // 获取缓存中的地址
    this.address = wx.getStorageSync('address')
    this.addressId = ''
    this.setNote = ''
    console.log('缓存获取地址数据'+this.address)
    if(this.address==''){

    // 获取用户地址
    address.getAddressList((res)=>{
      console.log(res);
      this.address_list = res.address_list;
      for(var i=0;i<this.address_list.length;i++){
        if (this.address_list[i].is_default==true){
          this.setData({
            address:this.address_list[i]
          })
          this.addressId= this.address_list[i].id
          console.log(this.addressId)
          // 将addressId放入缓存中
          wx.setStorageSync('addressId', this.addressId)
          
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
    this.commodity_list_num = wx.getStorageSync('commodity_list_num');
    console.log(this.commodity_list)
    this.count = 0;
    this.sum = 0;
    this.commodityId_list = [];
    for(var i=0;i<this.commodity_list.length;i++){
      this.commodityId_list.push(this.commodity_list[i].id);
      if(this.commodity_list_num!=''){
        console.log(this.commodity_list_num)
         this.count+=this.commodity_list_num;
            this.sum += this.commodity_list_num * this.commodity_list[i].price;
            wx.setStorageSync('order_price', this.sum)
            this.setData({
              commodity_list_num:this.commodity_list_num
            })
      }else {
          console.log('run')
           this.count+=this.commodity_list[i].num;
            this.sum += this.commodity_list[i].num * this.commodity_list[i].price;
            wx.setStorageSync('order_price', this.sum)
            this.setData({
              commodity_list_num:''
            })
      }

    }
    console.log(this.commodityId_list)
    console.log(this.count)
    console.log(this.sum)
    // console.log(this.commodity_list)
    this.setData({
      commodity_list:this.commodity_list,
      count:this.count,
      sum:this.sum.toFixed(2),
      sums: this.sum.toFixed(2)*100
    })
    // 删除缓存数据
    wx.removeStorageSync('commodity_list_num')

  },
  selectAddress:function(){
    wx.setStorageSync('orderClick', 'on')
    wx.navigateTo({
      url: '../address/address',
    })
  },
  // 获取备注信息
  setnote: function (e) {
    this.note = e.detail.value
    console.log(this.note)
  },
  onSubmit:function(){
    // 获取收货地址id
    var addressId = wx.getStorageSync('addressId')
    var commodity_num = wx.getStorageSync('commodity_list_num')
    // 创建订单
    if(this.note==''||this.note==undefined){
      this.note = '无备注'
    }
    order.createOrder(this.commodityId_list, addressId, this.note,commodity_num,(res)=>{
      console.log(res)
      if(res.msg=='商品库存不足'){
        wx.showToast({
          title: '库存不足',
          image: '/icons/cross.png',
          duration: 1000
        })

      }else if (res.msg =='订单创建成功'){
        // 获取支付签名信息
        var orderId = res.order_id
        console.log(orderId)
        order.toPay(orderId,(res)=>{
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
                url: '../orderlist/orderlist',
              })
            }
          })
        })
      }
    })
    
  },
  // 跳转优惠券页面
  toCard:function(){
    wx.setStorageSync('cardClick', 'on')
    wx.navigateTo({
      url: '../card/card',
    })
  }


})