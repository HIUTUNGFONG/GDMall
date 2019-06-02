
import { Base } from '../../utils/base.js'

class Cart extends Base {

  constructor() {
    super();
  }
  getCartList(callBack){
    // 获取购物车列表
    var params = {
      url: 'cart/get/' + wx.getStorageSync('token'),
      sCallBack: function (res) {
        callBack && callBack(res);
      }
    };
    this.request(params);
  }
  
}

export { Cart };