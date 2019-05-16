
import {Config} from '../utils/config.js';

class Base {

  constructor(){
    this.baseRequestUrl = Config.restUrl;
  }
  // 封装请求方法
  request(params){
    var url = this.baseRequestUrl + params.url;
    if (!params.method){
      params.method = 'GET';
    }
    wx.request({
      url: url,
      data: params.data,
      header: {
        'content-type':'application/json',
        'token':wx.getStorageSync('token')
      },
      method: params.method,
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
      //   if(params.sCallBack){
      //     params.sCallBack(res);
      //   }
        params.sCallBack&&params.sCallBack(res.data);
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  }

  // 获得元素上绑定的值
  getDataset(event,key){
    return event.currentTarget.dataset[key]
  }

  // 获取token方法
  getToken(){
    return wx.getStorageSync('token')
  }
  // 查找redis是否存在token
  findToken(callBack){
    var url = this.baseRequestUrl + 'getRedisToken/' + wx.getStorageSync('token');
    wx.request({
      url: url,
      data: {},
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        callBack && callBack(res.data);
      },
      fail: function (res) { },
      complete: function (res) { }
    })
  }
  // 查询用户是否存在
  findWxUser(callBack){
    var url = this.baseRequestUrl + 'createUser';
    wx.request({
      url: url,
      data: { "Data": {'token':wx.getStorageSync('token')}},
      heaader:{},
      method:'POST',
      dataType:'json',
      responseType:'text',
      success: function (res) {
        callBack && callBack(res.data);
      },
      fail: function (res) { },
      complete: function (res) { }
    })
  }

  

}

export {Base}