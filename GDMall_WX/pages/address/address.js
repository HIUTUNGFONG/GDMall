// pages/address.js

import { Address } from './address-model.js'

var address = new Address();


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
    this.params = wx.getStorageSync('orderClick')
    if(this.params=='on'){
      this.setData({
        click:true
      })
    }
    console.log(this.params)
    this.getAddressList()
  },
  getAddressList:function(){
    address.getAddressList((res) => {
      console.log(res)
      if (res.address_list.length == 0) {
        this.setData({
          addr_list_type: true
        })
      } else {
        this.setData({
          address_list: res.address_list
        })
      }
    })
  },
  addAddress:function(){
    wx.navigateTo({
      url: '/pages/addressforms/addressforms',
    })
  },
  onUpdate:function(e){
    var id = e.currentTarget.dataset.id;
    // console.log(id)
    wx.navigateTo({
      url: '../addressforms/addressforms?reset_id=' + id,
    })
  },
  onDelete: function (e) {
    var id = e.currentTarget.dataset.id;
    console.log(id)
    address.deleteAddress(id, (res) => {
      if (res.msg=='success'){
        this.getAddressList()
      }
    })
  },
  onDefault: function (e) {
    var id = e.currentTarget.dataset.id;
    console.log(id)
    address.updateDefaultAddress(id, (res) => {
      // console.log(res)
      if (res.msg=='success'){
        this.getAddressList()
      }
    })

  },
  // 跳转回订单页面
  toOrder:function(e){
    var addressId = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name
    var phone = e.currentTarget.dataset.phone
    var address = e.currentTarget.dataset.address
    var data = {
      'addressId':addressId,
      'name':name,
      'phone':phone,
      'address':address
    }
    wx.setStorageSync('address', data)
    wx.setStorageSync('addressId', addressId)
    wx.navigateTo({
      url: '../order/order',
    })
  }

})