
import { Base } from '../../utils/base.js'

class Goods extends Base{

  constructor(){
    super();
  }


  getPopupData(callBack) {
    // 获取侧边栏列表
    var params = {
      url: 'popup',
      sCallBack: function (res) {
        callBack && callBack(res);
      }
    };
    this.request(params);
  };

  getGoodsData(callBack){
    //获取产品列表
    var params = {
      url: 'goods',
      sCallBack: function(res) {
        callBack && callBack(res);
      }
    };
    this.request(params);
  }


  getGoodsDataById(goods_id,callBack){
    //获取产品列表
    var params = {
      url: 'goods/id/' + goods_id,
      sCallBack: function(res) {
        callBack && callBack(res);
      }
    };
    this.request(params);
  }

  
  getGoodsDataBySort(id,callBack) {
    //获取产品列表(类别id)
    var params = {
      url: 'goods/' + id,
      sCallBack: function (res) {
        callBack && callBack(res);
      }
    };
    this.request(params);
  }

  getGoodsDataByClassify(sort,classify,callBack) {
    //获取产品列表(类别id,分类id)
    var params = {
      url: 'goods/' + sort + '/' + classify,
      sCallBack: function (res) {
        callBack && callBack(res);
      }
    };
    this.request(params);
  }

  getGoodsDataBySearch(search_value, callBack) {
    //获取产品列表(关键字)
    var params = {
      url: 'goods/search',
      method:'POST',
      data: { 'Data': search_value},
      sCallBack: function (res) {
        callBack && callBack(res);
      }
    };
    this.request(params);
  }

  getCommodityList(goodsId,callBack){
    //获取商品列表，选择元素列表
    var params = {
      url: 'commodity/' + goodsId,
      sCallBack: function(res) {
        callBack && callBack(res);
      }
    };
    this.request(params);
  }

  addCommdityToCart(commodity_id,commodity_count,callBack){
    var params = {
      url: 'cart/add',
      method: 'POST',
      data: {
        'token': wx.getStorageSync('token'),
         'commodity_id': commodity_id,
        'commodity_count': commodity_count
       },
      sCallBack: function (res) {
        callBack && callBack(res);
      }
    };
    this.request(params);
  }

  getGoodsAttribute(goodsId,callBack){
    //获取商品列表，选择元素列表
    var params = {
      url: 'goods/attribute/' + goodsId,
      sCallBack: function(res) {
        callBack && callBack(res);
      }
    };
    this.request(params);
  }
  // 获取产品属性
}

export{Goods};

