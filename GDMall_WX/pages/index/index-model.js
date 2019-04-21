
import {Base} from '../../utils/base.js'

class Index extends Base{

  constructor(){
    super();
  }


  getBannerData(callBack){
    // 获取主页轮播图
    var params = {
      url: 'banner',
      sCallBack:function(res){
        callBack && callBack(res);
      }
    }
    this.request(params);


    // wx.request({
    //   url: 'http://192.168.3.40/api/banner',
    //   method:'GET',
    //   success:function(res){
    //     // return res;
    //     callBack(res);
    //   }
    // })
  }

}

export {Index};