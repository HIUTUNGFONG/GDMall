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
    this.params = wx.getStorageSync('toOrder')
    if(this.params=='click'){
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
    console.log(id)
    wx.navigateTo({
      url: '../addressforms/addressforms?reset_id=' + id,
    })
  },
  onDelete: function (e) {
    var id = e.currentTarget.dataset.id;
    console.log(id)
    address.deleteAddress(id, (res) => {
      console.log(res)      
    })
    this.getAddressList()
  },
  onDefault: function (e) {
    var id = e.currentTarget.dataset.id;
    console.log(id)
    address.updateDefaultAddress(id, (res) => {
      console.log(res)
    })
    this.getAddressList()
  },
  toOrder:function(e){
    var name = e.currentTarget.dataset.name
    var phone = e.currentTarget.dataset.phone
    var address = e.currentTarget.dataset.address
    var data = {
      'name':name,
      'phone':phone,
      'address':address
    }
    wx.setStorageSync('address', data)
    // console.log(name)
    // console.log(phone)
    // console.log(address)
    wx.navigateTo({
      url: '../order/order',
    })
  }

})