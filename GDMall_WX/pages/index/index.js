//index.js

var app = getApp();

//获取应用实例
import {Index} from 'index-model.js';

var index = new Index();


Page({
  data: {

    vp:true,  //视频或图片栏控制显示参数
    showManType:false,
    mwImageUrl:'https://grotesquery.oss-cn-shenzhen.aliyuncs.com/media/Banner/mw.png'

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
  onWomen: function(){
    // 跳转女装产品列表页
    console.log(app.globalData.is_query)
    app.globalData.is_query = 1
    
    wx.reLaunch({
      url: '../goods/goods',
    })
  },
  onVip: function () {
    // 跳转vip页面
    wx.navigateTo({
      url: '../vip/vip',
    })
  }
  

  
})
