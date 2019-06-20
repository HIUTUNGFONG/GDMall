// pages/userinfo/userinfo.js

import {User} from '../user/user-model.js'

var user = new User();

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
    user.getWxUserInfo((res)=>{
      console.log(res)
      this.setData({
        user_info:res
      })
    })
  },
  setPhone:function(e){
    this.phone = e.detail.value
    
  },
  onSave:function(){
    var phone = this.phone
    if (phone.length != 11) {
      wx.showModal({
        title: '提示',
        content: '手机号格式不正确',
      })
    } else {
      // 修改信息
      user.updataWxuser(phone, (res) => {
        if (res.msg == '修改成功') {
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 1000
          })
        } else {
          wx.showToast({
            title: '修改失败',
            icon: 'error',
            duration: 1000
          })
        }
      })
    }
  }
})