// pages/cart/cart.js

import {Cart} from './cart-model.js'

var cart = new Cart();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        current: 'cartpage',  //底部导航栏参数
        //数据结构：以一组一组的数据来进行设定
        checked: true,
        icon: {
            normal: '//img.yzcdn.cn/icon-normal.png',
            active: '//img.yzcdn.cn/icon-active.png'
        },
        // carts: [
        //     {id: 1, title: '华为 HUAWEI P10 全网通 4GB+64G 曜石黑 移动联通电信4GB手机', num: 4, price: 4500, selected: true},
        //     {id: 2, title: 'Apple苹果 全网通 4GB+64G 曜石黑 移动联通电信4GB手机', num: 1, price: 6800, selected: true},
        //     {id: 3, title: '小米 全网通 4GB+64G 曜石黑 移动联通电信4GB手机', num: 2, price: 4800, selected: true},
        //   { id: 3, title: '小米 全网通 4GB+64G 曜石黑 移动联通电信4GB手机', num: 2, price: 4800, selected: true },
        //     {id: 3, title: '小米 全网通 4GB+64G 曜石黑 移动联通电信4GB手机', num: 2, price: 4800, selected: true},
        //   { id: 3, title: '小米 全网通 4GB+64G 曜石黑 移动联通电信4GB手机', num: 2, price: 4800, selected: true },
        //     {id: 3, title: '小米 全网通 4GB+64G 曜石黑 移动联通电信4GB手机', num: 2, price: 4800, selected: true},
        //   { id: 3, title: '小米 全网通 4GB+64G 曜石黑 移动联通电信4GB手机', num: 2, price: 4800, selected: true },
        //   { id: 3, title: '小米 全网通 4GB+64G 曜石黑 移动联通电信4GB手机', num: 2, price: 4800, selected: true }
        // ],
        //  hasList: tue,          // 列表是否有数据
        totalPrice: 0,           // 总价，初始为0
        selectAll: false,    // 全选状态，默认不全选
        selectNum: 0         //选中的件数

    },

    onChange(event) {
        this.setData({
            checked: event.detail
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        cart.getCartList((res) => {
            this.carts = res.commodity_list
          if (res.commodity_list != undefined){
            this.totlePrice()
          }
          
        })

    },

    // 底部导航栏跳转
    handleChange({detail}) {
        this.setData({
            current: detail.key
        });
        console.log(detail.key)
        var tourl = ''
        if (detail.key == 'indexpage') {
            tourl = '../index/index'
        } else if (detail.key == 'goodspage') {
            tourl = '../goods/goods'
        } else if (detail.key == 'cartpage') {
            tourl = '../cart/cart'
        } else if (detail.key == 'userpage') {
            tourl = '../user/user'
        }
        wx.redirectTo({
            url: tourl
        })
    },


    //-----------------


    totlePrice: function () {
        let carts = this.carts;
        let total = 0;
        let num = 0;
        for (let i = 0; i < carts.length; i++) {         // 循环列表得到每个数据
            if (carts[i].selected) {                   // 判断选中才会计算价格
                total += carts[i].num * carts[i].price;
                num += carts[i].num;
            }
        }
        this.setData({
            carts: carts,
            selectNum: num,
            totalPrice: total.toFixed(2)
        });
    },
    //选中反选
    selected: function (e) {
        const index = e.currentTarget.dataset.num;
        let carts = this.carts;
        let selectAll = this.data.selectAll;
        let count = 0;
        carts[index].selected = !carts[index].selected;
        //判断全选状态
        for (let i = 0; i < carts.length; i++) {
            if (carts[i].selected == true) {
                count++;
            }
        }
        if (count == carts.length) {
            selectAll = true;
        } else {
            selectAll = false;
        }
        this.setData({
            carts: carts,
            selectAll: selectAll
        });
        this.totlePrice();
    }
    //全选
    , selectedAll: function () {
        let selectAll = this.data.selectAll;   // 是否全选状态
        selectAll = !selectAll;
        let carts = this.carts;

        for (let i = 0; i < carts.length; i++) {
            carts[i].selected = selectAll;    // 改变所有商品状态
        }
        this.setData({
            selectAll: selectAll,
            carts: carts
        });
        this.totlePrice();     // 获取总价
    },
    // 改变数值
    changeNum: function (e) {
        const index = e.currentTarget.dataset.num;
        let carts = this.carts;
        var cnum = parseInt(e.detail.value);
        cart.updataCommodityCount(carts[index].id, cnum, (res) => {
            if (res.errmsg) {
                console.log('aaa')
                this.setData({
                    carts: carts
                });
                this.totlePrice();
            } else {
                carts[index].num = cnum;
                console.log('bbb')
                this.setData({
                    carts: carts
                });
                this.totlePrice();
            }
        })


    },
    //增加
    addNum: function (e) {
        const index = e.currentTarget.dataset.num;
        let carts = this.carts;
        let num = parseInt(carts[index].num);
        cart.updataCommodityCount(carts[index].id, num + 1, (res) => {
            if (res.errmsg) {
                this.setData({
                    carts: carts
                });
                this.totlePrice();
            } else {

                num = num + 1;
                carts[index].num = num;
                this.setData({
                    carts: carts
                });
                this.totlePrice();
            }
        })

    }
    //减少
    , subNum: function (e) {
        const index = e.currentTarget.dataset.num;
        let carts = this.carts;
        let num = parseInt(carts[index].num);
        if (num <= 1) {
            return false;
        }
        cart.updataCommodityCount(carts[index].id, num - 1, (res) => {
            if (res.errmsg) {
                this.setData({
                    carts: carts
                });
                this.totlePrice();
            } else {

                num = num - 1;
                carts[index].num = num;
                this.setData({
                    carts: carts
                });
                this.totlePrice();
            }
        })
    },
    // 删除
    ondelete: function (e) {
        let carts = this.carts;
        for (var i = 0; i < carts.length; i++) {
            if (carts[i].selected == true) {
                cart.deleteCommodity(carts[i].id, (res) => {
                    console.log(res)
                })
            }
        }
        cart.getCartList((res) => {
            this.carts = res.commodity_list
            this.totlePrice()
        })

    },
  toSettlement:function(){
    // 获取已勾选的商品id、数量
    let carts = this.carts;
    // var commodityId_list = [];
    // var commodityCount_list = [];
    var commodity_list = [];
    for (let i = 0; i < carts.length; i++) {         // 循环列表得到每个数据
      if (carts[i].selected) { 
        //将选中的商品加入到数组中     
        commodity_list.push(carts[i])     
        // commodityId_list.push(carts[i].id);
        // commodityCount_list.push(carts[i].num);
      }
    }
    //判断是否有选择商品
    // if(commodityId_list==''||commodityCount_list==''){
    if(commodity_list==''){
      console.log('请选择商品')
    }else{
      // 将数据放入缓存中
      // console.log(commodityId_list)
      // console.log(commodityCount_list)
      // wx.setStorageSync('commodityId_list', commodityId_list)
      // wx.setStorageSync('commodityCount_list', commodityCount_list)
      wx.setStorageSync('commodity_list', commodity_list)
      // 跳转到订单页面
      wx.navigateTo({
        url: '../order/order',
      })
    }
    
  }
})