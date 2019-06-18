
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
  //修改购物车商品数量
  updataCommodityCount(commodity_id,commodity_count,callBack) {
    // 获取购物车列表
    var params = {
      url: 'cart/updata',
      method:'POST',
      data:{
        "token": wx.getStorageSync('token'),
        "commodity_id": commodity_id,
        "commodity_count": commodity_count
      },
      sCallBack: function (res) {
        callBack && callBack(res);
      }
    };
    this.request(params);
  }
  // 删除商品
  deleteCommodity(commodityId_list,callBack){
    var params={
      url: 'cart/delete',
      method:'POST',
      data:{
        "token": wx.getStorageSync('token'),
        "commodityId_list": commodityId_list
      },
      sCallBack: function (res) {
        callBack && callBack(res);
      }
    };
    this.request(params);


  }
}

export { Cart };