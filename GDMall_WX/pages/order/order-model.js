
import { Base } from '../../utils/base.js'

class Order extends Base {

  constructor() {
    super();
  }
  toPay(order_id,callBack){
    // 获取购物车列表
    var params = {
      url: 'toPay',
      method:'POST',
      data:{
        'token': wx.getStorageSync('token'),
        'order_id': order_id
      },
      sCallBack: function (res) {
        callBack && callBack(res);
      }
    };
    this.request(params);
  }

  createOrder(commodityId_list,address_id,callBack){
    // 创建订单
    var params = {
      url: 'order/create',
      method : 'POST',
      data : {
        'token': wx.getStorageSync('token'),
        'commodityId_list': commodityId_list,
        'address_id': address_id
      },
      sCallBack: function(res){
        callBack && callBack(res);
      }
    };
      this.request(params);
  }
  getOrderInfoList(callBack){
    url: 'order/get/' + wx.getStorageSync('token'),
      sCallBack: function(res) {
        callBack && callBack(res);
      }
  }
}

export { Order };