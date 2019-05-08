// pages/user/user.js

import { User } from './user-model.js'

var user = new User();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        wx.getSetting({
            success(res) {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    wx.getUserInfo({
                        success(res) {
                            console.log(res.userInfo)
                            that.setData({
                            nickName: res.userInfo.nickName,
                            avatarUrl: res.userInfo.avatarUrl,
                          }) 
                        }

                    })
                }
            }
        })

      //获取openid
      wx.login({
        success: res => {
          console.log(res)
          user.getOpenid(res.code,(res)=>{
            success:{
              console.log(res)
              wx.setStorageSync('sessionid', res.token)
              console.log(wx.getStorageSync('sessionid'))
            }
          })
        }
      })
    
    },
    bindGetUserInfo(e) {
        console.log(e.detail.userInfo)
    },
    

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})