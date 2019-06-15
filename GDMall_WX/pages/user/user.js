// pages/user/user.js

import {User} from './user-model.js'

var user = new User();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        is_sq: true,  //授权
        current: 'userpage',  //底部导航栏参数


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
        if (user.getToken().length == 64) {
            // 存在
            console.log('成功获取token')
            user.findToken((res) => {
                // 查找redis是否存在对应token
                // console.log(res.msg)
                if (res.msg == 'success') {
                    console.log('redis存在对应token')
                } else if (res.msg == 'fail') {
                    // 获取code，添加到用户表
                    wx.login({
                        success: res => {
                            console.log(res)
                            user.getOpenid(res.code, (res) => {
                                success: {
                                    console.log(res)
                                    // 将返回的token加入到微信session中
                                    wx.setStorageSync('token', res.token)
                                    console.log(user.getToken())
                                    user.findWxUser((res) => {
                                        console.log(res)
                                    })
                                }
                            })
                        }
                    })
                }
            })
        } else {
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
                            user.findWxUser((res) => {
                                console.log(res)
                            })
                        }
                    })
                }
            })

        }

        
    },







    bindGetUserInfo(e) {
        console.log(e.detail.userInfo)
    },
    // 底部导航栏跳转
    handleChange({detail}) {
        this.setData({
            current: detail.key
        });
        console.log(detail.key)
        var tourl = ''
        if (detail.key == 'indexpage') {
            tourl = '../index/index'
        } else if (detail.key == 'goodspage') {
            tourl = '../goods/goods'
        } else if (detail.key == 'cartpage') {
            tourl = '../cart/cart'
        } else if (detail.key == 'userpage') {
            tourl = '../user/user'
        }
        wx.redirectTo({
            url: tourl
        })
    },
  noToOrder:function(){
    // 将缓存的toOrder设置为空
    wx.setStorageSync('toOrder', '')
  }


})