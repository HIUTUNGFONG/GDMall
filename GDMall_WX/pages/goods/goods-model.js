
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
    }
    this.request(params);
  };

  getGoodsData(callBack){
    //获取产品列表
    var params = {
      url: 'goods',
      sCallBack: function(res) {
        callBack && callBack(res);
      }
    }
    this.request(params);
  }

  
  getGoodsDataBySort(id,callBack) {
    //获取产品列表(类别id)
    var params = {
      url: 'goods/sort/' + id,
      sCallBack: function (res) {
        callBack && callBack(res);
      }
    }
    this.request(params);
  }

    getGoodsDataByClassify(id,callBack) {
    //获取产品列表(类别id)
    var params = {
      url: 'goods/classify/' + id,
      sCallBack: function (res) {
        callBack && callBack(res);
      }
    }
    this.request(params);
  }

}

export{Goods};

