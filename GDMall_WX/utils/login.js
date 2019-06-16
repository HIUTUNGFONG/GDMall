
import {Base} from './base.js';

class Login extends Base{

  constructor() {
    super();
  }

  // 查找redis是否存在token
  findToken(callBack) {
    var params = {
      url: 'findRedisToken/' + wx.getStorageSync('token'),
      sCallBack: function (res) {
        callBack && callBack(res);
      }
    }
    this.request(params);
  }
  // 根据code换取openid、session_key，查找wx_user表是否存在该wx用户
  findWxUser(code,callBack) {
    var params = {
      url: 'createUser',
      method:'POST',
      data:{
        'code':code
      },
      sCallBack: function (res) {
        callBack && callBack(res);
      }
    }
    this.request(params);
  }


}

export {Login}