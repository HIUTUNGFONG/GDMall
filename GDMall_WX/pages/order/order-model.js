import {Base} from '../../utils/base.js'

class Order extends Base {

    constructor() {
        super();
    }

    toPay(order_id, callBack) {
        // 获取购物车列表
        var params = {
            url: 'toPay',
            method: 'POST',
            data: {
                'token': wx.getStorageSync('token'),
                'order_id': order_id
            },
            sCallBack: function (res) {
                callBack && callBack(res);
            }
        };
        this.request(params);
    }

    // createOrder(commodityId_list, address_id, note, callBack) {
    //     // 创建订单
    //     var params = {
    //         url: 'order/create',
    //         method: 'POST',
    //         data: {
    //             'token': wx.getStorageSync('token'),
    //             'commodityId_list': commodityId_list,
    //             'address_id': address_id,
    //             'note': note
    //         },
    //         sCallBack: function (res) {
    //             callBack && callBack(res);
    //         }
    //     };
    //     this.request(params);
    // }
  createOrder(commodityId_list, address_id, note, num, card_price, card_token, callBack) {
      // 创建订单
      var params = {
        url: 'order/create',
        method: 'POST',
        data: {
          'token': wx.getStorageSync('token'),
          'commodityId_list': commodityId_list,
          'address_id': address_id,
          'note': note,
          'num':num,
          'card_price':card_price,
          'card_token': card_token
        },
        sCallBack: function (res) {
          callBack && callBack(res);
        }
      };
      this.request(params);
    }

    getOrderInfoList(callBack) {
        var params = {
            url: 'order/get/' + wx.getStorageSync('token'),
            sCallBack: function (res) {
                callBack && callBack(res);
            }
        }
        this.request(params);
    }

    getOrderInfoListById(order_info_id, callBack) {
        var params = {
            url: 'order/getById',
            method: 'POST',
            data: {
                'order_info_id': order_info_id,
                'token': wx.getStorageSync('token')
            },
            sCallBack: function (res) {
                callBack && callBack(res);
            }
        }
        this.request(params);
    }

    deleteOrder(order_info_id, callBack) {
        var params = {
            url: 'order/del',
            method: 'POST',
            data: {
                'order_info_id': order_info_id,
                'token': wx.getStorageSync('token')
            },
            sCallBack: function (res) {
                callBack && callBack(res);
            }
        }
        this.request(params);
    }
    // 确认订单
  confirmOrder(order_info_id, callBack) {

        var params = {
            url: 'order/confirm',
            method: 'POST',
            data: {
                'order_info_id': order_info_id,
                'token': wx.getStorageSync('token')
            },
            sCallBack: function (res) {
                callBack && callBack(res);
            }
        }
        this.request(params);
    }
    // 申请退货
  returnsOrder(order_info_id,returns_num, callBack) {

        var params = {
            url: 'order/returns',
            method: 'POST',
            data: {
                'order_info_id': order_info_id,
              'returns_num': returns_num,
                'token': wx.getStorageSync('token')
            },
            sCallBack: function (res) {
                callBack && callBack(res);
            }
        }
        this.request(params);
    }
}

export {Order};