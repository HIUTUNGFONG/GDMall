
import { Base } from '../../utils/base.js'

class Address extends Base {

  constructor() {
    super();
  }
  getAddressList(callBack) {
    // 获取地址列表
    var params = {
      url: 'address/get/' + wx.getStorageSync('token'),
      sCallBack: function (res) {
        callBack && callBack(res);
      }
    };
    this.request(params);
  }

  addAddress(name,phone,address,address_code,is_default,callBack){
    // 添加地址
    var params = {
      url: 'address/add',
      method:'POST',
      data:{
        'token': wx.getStorageSync('token'),
        'name': name,
        'phone': phone,
        'address':address,
        'address_code':address_code,
        'is_default':is_default
      },
      sCallBack: function (res) {
        callBack && callBack(res);
      }
    };
    this.request(params);
  }
  deleteAddress(address_id,callBack){
    
    var params={
      url: 'address/delete',
      method: 'POST',
      data: {
        'token': wx.getStorageSync('token'),
        'address_id': address_id
      },
      sCallBack: function (res) {
        callBack && callBack(res);
      }
    };
    this.request(params);
  }
  updateDefaultAddress(address_id, callBack) {
    var params = {
      url: 'address/update/default',
      method: 'POST',
      data:{
        "token": wx.getStorageSync('token'),
        "address_id": address_id
      },
      sCallBack: function (res) {
        callBack && callBack(res);
      }
    };
    this.request(params);
  }
  updateAddress(address_id,name,phone,address,address_code,is_default,callBack){
    var params = {
      url:'address/update',
      method:'POST',
      data:{
        'token': wx.getStorageSync('token'),
        'address_id':address_id,
        'name': name,
        'phone': phone,
        'address': address,
        'address_code': address_code,
        'is_default': is_default
      },
      sCallBack: function (res) {
        callBack && callBack(res);
      }
    };
    this.request(params);
    }

  
}

export { Address };