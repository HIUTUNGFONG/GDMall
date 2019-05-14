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
      // 获取用户token
      if(user.getToken().length == 64){
        // 存在
        console.log('ok')
        user.findToken((res) => {
        // 查找redis是否存在对应token
          console.log(res.msg)
          if(res.msg=='success'){
            console.log('登录成功')
          }else if(res.msg=='failure'){
            // 获取code，添加到用户表
            wx.login({
              success: res=>{
                
              }
            })
          }
        })
      }else{
        // 不存在
        //获取openid
        wx.login({
          success: res => {
            console.log(res)
            user.getOpenid(res.code, (res) => {
              success: {
                console.log(res)
                // 将返回的token加入到微信session中
                wx.setStorageSync('token', res.token)
                console.log(user.getToken())
              }
            })
          }
        })

      }
      
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