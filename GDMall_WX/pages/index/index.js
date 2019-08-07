//index.js

var app = getApp();

//获取应用实例
import {Index} from 'index-model.js';

var index = new Index();


Page({
  data: {
    vp:true,  //视频或图片栏控制显示参数
    showManType:false,mwImageUrl:'https://grotesquery-mall.oss-cn-shenzhen.aliyuncs.com/media/common/86847ed413c4c738ee6dafdc0a08529.jpg',
    current: 'indexpage',  //底部导航栏参数
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
      // console.log(res.ics)
      this.setData({
        'ivobs': res.ivobs[0]
      })
    });
  },
  onProduct: function (e){
    this.url = e.currentTarget.dataset.url;
    console.log(this.url)
    // 轮播图跳转
    if(this.url=='new'){
      app.globalData.is_query = 2;
      wx.reLaunch({
        url: '../goods/goods',
      });
    }else if(this.url!='none'){
      wx.navigateTo({
        url: "../" + this.url
      })
    }
    
  },
  on_mw_1: function () {
    // 控制男装显示隐藏
    var that = this;
    that.setData({
      showManType: (!that.data.showManType)
    })

  },
  clickToPage: function(e){
    var classify = e.currentTarget.dataset.classify
    var goodsId = e.currentTarget.dataset.goodsid
    if(classify>0){
      wx.setStorageSync('classify', classify)
      app.globalData.is_query = -1;
      wx.reLaunch({
        url: '../goods/goods',
      });
    }else{
      wx.navigateTo({
        url: '../product/product?goodsId=' + goodsId,
      })
    }
    
  },
  onWomen: function(){
    // 跳转女装产品列表页
    console.log(app.globalData.is_query)
    app.globalData.is_query = 1;
    wx.reLaunch({
      url: '../goods/goods',
    });
  },
  onVip: function () {
    // 跳转vip页面
    wx.navigateTo({
      url: '../vip/vip',
    })
  },
  // 底部导航栏跳转
  handleChange({ detail }) {
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
  }
})
