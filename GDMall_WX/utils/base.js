
import {Config} from '../utils/config.js';

class Base {

  constructor(){
    this.baseRequestUrl = Config.restUrl;
  }

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

}

export {Base}