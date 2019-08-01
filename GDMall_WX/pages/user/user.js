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
        user.getBackground((res)=>{
          console.log(res.data[0].image)
          this.setData({
            
            backgroundImg: "background-image: url(https://grotesquery-mall.oss-cn-shenzhen.aliyuncs.com/media/" + res.data[0].image+");"
          })
        })
        user.getCard((res)=>{
          this.card_count = res.data.length
          if(this.card_count==''||this.card_count==undefined){
            this.card_count = 0
          }
          console.log(this.card_count)
          this.setData({
            card_count : this.card_count
          })
        })


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
    noToOrder: function () {
        // 将缓存的toOrder设置为空
        wx.setStorageSync('toOrder', '')
    },
    to_order_state_1: function () {
        wx.navigateTo({
            url: '../orderlist/orderlist?select=1'
        })
    },
    to_order_state_2: function () {
        wx.navigateTo({
            url: '../orderlist/orderlist?select=2'
        })
    },
    to_order_state_3: function () {
        wx.navigateTo({
            url: '../orderlist/orderlist?select=3'
        })
    },
    to_order_state_4: function () {
        wx.navigateTo({
            url: '../orderlist/orderlist?select=4'
        })
    },
    toCard:function(){
      wx.navigateTo({
        url: '../card/card',
      })
    }
})