//index.js
//获取应用实例
import {Index} from 'index-model.js';

var index = new Index();


Page({
  data: {

    vp:true,  //视频或图片栏控制显示参数
    showManType:false,
mwImageUrl:'https://6772-grotesquery-e9db0d-1259050260.tcb.qcloud.la/index/man_woman.png?sign=72791a10240bdea152091aabb1875cdb&t=1555514508'

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    showManType: (options.showManType == "true" ? true : false)
    this._loadData();
  
  },
  _loadData:function(){
    index.getBannerData((res)=>{
    // 回调函数
      // console.log(res);
      this.setData({
        'ics':res.ics
      })
      console.log(res.ics)
      this.setData({
        'ivobs': res.ivobs[0]
      })
    });
  },
  onProduct: function (){
    // 轮播图跳转
    wx.navigateTo({
      url: '../product/product',
    })
  },

  on_mw_1: function () {
    // 控制男装显示隐藏
    var that = this;
    that.setData({
      showManType: (!that.data.showManType)
    })

  },
  onVip: function () {
    wx.navigateTo({
      url: '../vip/vip',
    })
  }

  
})
