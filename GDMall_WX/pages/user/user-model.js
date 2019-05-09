
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

}

export { User };