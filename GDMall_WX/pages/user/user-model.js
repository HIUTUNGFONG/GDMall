
import { Base } from '../../utils/base.js'

class User extends Base {

  constructor() {
    super();
  }


  getOpenid(code,callBack) {
    // 获取openid
    var params = {
      url: 'getToken/'+code,
      sCallBack: function (res) {
        callBack && callBack(res);
      }
    }
    this.request(params);

  }
  getWxUserInfo(callBack){
    var params = {
      url: 'getWxUserInfo/' + wx.getStorageSync('token'),
      sCallBack: function (res) {
        callBack && callBack(res);
      }
    }
    this.request(params);
  }
  updataWxuser(phone,callBack){
    var params = {
      url: 'updataWxUserInfo',
      method:'POST',
      data:{
        'phone':phone,
        'token': wx.getStorageSync('token')
      },
      sCallBack: function (res) {
        callBack && callBack(res);
      }
    }
    this.request(params);
  }
  getCard(callBack) {
    var params = {
      url: 'getcard/' + wx.getStorageSync('token'),
      sCallBack: function (res) {
        callBack && callBack(res);
      }
    }
    this.request(params);
  }
  getBackground(callBack) {
    var params = {
      url: 'get/background',
      sCallBack: function (res) {
        callBack && callBack(res);
      }
    }
    this.request(params);
  }
}

export { User };