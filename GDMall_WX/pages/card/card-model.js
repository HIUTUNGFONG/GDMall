
import { Base } from '../../utils/base.js'

class Card extends Base {

  constructor() {
    super();
  }
  getCardList(callBack) {
    // 获取优惠券列表
    var params = {
      url: 'card/get/' + wx.getStorageSync('token'),
      sCallBack: function (res) {
        callBack && callBack(res);
      }
    };
    this.request(params);
  }

}

export { Card };