// pages/addressforms/addressforms.js

import { Address } from '../address/address-model.js'

var addr = new Address();


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
    this.set_default = false;
    this.reset_id = options.reset_id;   //获取url请求转发的addressId
    // 如果获取的修改地址的id不为空
    if (this.reset_id != undefined){
      addr.getAddressList((res) => {
        // console.log(res.address_list)
        var address_data = res.address_list;
        // 获取该地址id的信息
        for (var i = 0; i < address_data.length; i++) {
          if (address_data[i].id == this.reset_id) {
            var addr_data = address_data[i]
          }
        }
        console.log(addr_data)
        // 将地址的信息设置到前端
        this.setData({
          'resetid':this.reset_id,
          'name': addr_data.name,
          'phone': addr_data.phone,
          'address': addr_data.address,
          'code': addr_data.address_code,
          'set_default': addr_data.is_default
        })

        this.name = addr_data.name;
        this.phone = addr_data.phone;
        this.address = addr_data.address;
        this.code = addr_data.address_code;
        this.set_default = addr_data.is_default;
        console.log(this.name)
        console.log(this.phone)
        console.log(this.address)
        console.log(this.code)
        console.log(this.set_default)
      })
    }
  },
  // 点击设为默认地址事件
  onDefault:function(e){
    this.set_default = (!this.set_default)
    this.setData({
      set_default: this.set_default
    })
  },
  setName:function(e){
    this.name = e.detail.value
  },
  setPhone: function (e) {
    this.phone = e.detail.value
  },
  setAddress: function (e) {
    this.address = e.detail.value
  },
  setCode: function (e) {
    this.code = e.detail.value
    console.log(this.code)
  },
  onSave:function(e){
    if (this.reset_id == undefined){
      if (this.name == undefined || this.phone == undefined || this.address == undefined) {
        wx.showToast({
          title: '请填写完整！',
          image: '/icons/cross.png',
          duration: 1000
        })
      } else {
        if (this.code == undefined) {
          this.code = ''
        }
        addr.addAddress(this.name, this.phone, this.address, this.code, this.set_default, (res) => {
          if (res.msg == 'success') {
            wx.navigateTo({
              url: '/pages/address/address',
            })
          }
        })
      }
    }else{
      console.log(this.reset_id)

      if (this.name == undefined || this.phone == undefined || this.address == undefined) {
        wx.showToast({
          title: '请填写完整！',
          image: '/icons/cross.png',
          duration: 1000
        })
      } else {
        if (this.code == undefined) {
          this.code = ''
        }
        addr.updateAddress(this.reset_id, this.name, this.phone, this.address, this.code, this.set_default, (res) => {
          if (res.msg == 'success') {
            wx.navigateTo({
              url: '/pages/address/address',
            })
          }
        })
      }
      
      
    }
    
  }
  
})