//index.js
//获取应用实例
import {Index} from 'index-model.js';

var index = new Index();

Page({
  data: {

    vp:true,  //视频或图片栏控制显示参数
    showManType:false

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
        'bannerArr':res
      })
    });
    // console.log(data);
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

  }

  
})
