import {Goods} from './goods-model.js'

var app = getApp();
var goods = new Goods();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        show_left: false,     //左侧栏显示
        overlay_left: true,   //左侧蒙层显示
        show_right: false,    //右侧栏显示
        overlay_rigth: true,  //右侧蒙层显示
        popup_data: '',       //左侧栏数据
        active: 0,            //标签栏激活索引
        price_label: 0,       //价格标签状态
        goods_list: '',       //产品列表
        is_query: 0,          //是否查询参数
        minPrice: 0,          //筛选最低价格
        maxPrice: 0,          //筛选最高价格

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {


        // 查询左侧类别分类栏
        goods.getPopupData((res) => {
            this.setData({'popup': res.data})
            // console.log(res.data)
        });


    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        if (app.globalData.is_query != 1) {
            // 查询产品列表
            this.getAllGoods();
        } else {
            // 查询女装产品列表
            goods.getGoodsDataBySort(2, (res) => {
                this.setData({goods_list: res.data});
            })
            console.log('查询成功')
            app.globalData.is_query = 0
        }


    },


    onShowPopup: function () {
        // 显示侧边栏,查询类别和分类
        this.setData({
            show_left: true
        });

    },
    onClosePopupLeft() {
        //点击左侧蒙层时触发
        this.setData({show_left: false});
    },
    onClosePopupRight() {
        //点击右侧蒙层时触发
        this.setData({show_right: false});
    },
    // 右侧筛选栏最小价格失去焦点事件
    minPrice(event) {
        this.setData({minPrice: event.detail.value})
        console.log(this.data.minPrice)
    },
    // 右侧筛选栏最大价格失去焦点事件
    maxPrice(event) {
        this.setData({maxPrice: event.detail.value})
        console.log(this.data.maxPrice)
    },
    // 右侧筛选栏重置事件
    onPriceReset() {
        this.setData({minPrice: 0})
        this.setData({maxPrice: 0})
        this.setData({pvalue: 0})

    },
    // 右侧筛选栏确定事件
    onPriceConfirm() {
        // 根据产品价格区间筛选结果
        var goods_list = this.data.goods_list;
        console.log(goods_list)
        var minPrice = this.data.minPrice
        var maxPrice = this.data.maxPrice
        var temp = [];
        if (minPrice == 0 && maxPrice == 0) {
            temp = goods_list
        } else if (minPrice == 0) {
            for (var i = 0; i < goods_list.length; i++) {
                if (goods_list[i][0].commodity[0].price <= maxPrice) {
                    temp.push(goods_list[i])
                }
                console.log(temp)
            }
        } else if (maxPrice == 0) {
            for (var i = 0; i < goods_list.length; i++) {
                if (goods_list[i][0].commodity[0].price >= minPrice) {
                    temp.push(goods_list[i])
                }
                console.log(temp)
            }
        } else {
            for (var i = 0; i < goods_list.length; i++) {
                if (goods_list[i][0].commodity[0].price >= minPrice && goods_list[i][0].commodity[0].price <= maxPrice) {
                    temp.push(goods_list[i])
                }
                console.log(temp)
            }
        }


        this.setData({goods_list: temp})
    },


    onChange(event) {
        // 标签栏

        // 点击综合事件
        if (event.detail.index == 0) {
            // 根据产品发布排序
            var goods_list = this.data.goods_list
            for (var i = 0; i < goods_list.length; i++)
                for (var j = 0; j < goods_list.length - i - 1; j++)
                    if (goods_list[j][0].goods.create_time < goods_list[j + 1][0].goods.create_time) {
                        var temp = goods_list[j + 1]
                        goods_list[j + 1] = goods_list[j]
                        goods_list[j] = temp
                    }
            console.log(goods_list)
            this.setData({goods_list: goods_list})
        }

        // 点击销量事件
        if (event.detail.index == 1) {
            // 根据产品销量排序
            var goods_list = this.data.goods_list
            for (var i = 0; i < goods_list.length; i++)
                for (var j = 0; j < goods_list.length - i - 1; j++)
                    if (goods_list[j][0].goods.sales < goods_list[j + 1][0].goods.sales) {
                        var temp = goods_list[j + 1]
                        goods_list[j + 1] = goods_list[j]
                        goods_list[j] = temp
                    }
            console.log(goods_list)
            this.setData({goods_list: goods_list})
        }


        // 点击价格事件
        if (event.detail.index == 2) {
            if (this.data.price_label == 0) {
                // 第一次点击设置成^
                this.setData({price_label: 1})
            }
            ;
            if (this.data.price_label == -1) {
                // 根据产品价格升序排序
                var goods_list = this.data.goods_list
                for (var i = 0; i < goods_list.length; i++)
                    for (var j = 0; j < goods_list.length - i - 1; j++)
                        if (goods_list[j][0].commodity[0].price > goods_list[j + 1][0].commodity[0].price) {
                            var temp = goods_list[j + 1]
                            goods_list[j + 1] = goods_list[j]
                            goods_list[j] = temp
                        }
                console.log(goods_list)
                this.setData({goods_list: goods_list})
                // 第二次点击取现在的相反值
                this.setData({price_label: -this.data.price_label});

            } else if (this.data.price_label == 1) {
                // 根据产品价格升序排序
                var goods_list = this.data.goods_list
                for (var i = 0; i < goods_list.length; i++)
                    for (var j = 0; j < goods_list.length - i - 1; j++)
                        if (goods_list[j][0].commodity[0].price < goods_list[j + 1][0].commodity[0].price) {
                            var temp = goods_list[j + 1]
                            goods_list[j + 1] = goods_list[j]
                            goods_list[j] = temp
                        }
                console.log(goods_list)
                this.setData({goods_list: goods_list})
                // 第二次点击取现在的相反值
                this.setData({price_label: -this.data.price_label});
            }
        } else {
            // 点击其他改变回原值
            this.setData({price_label: 0});
        }
        // 点击新品事件
        if (event.detail.index == 3) {
            // 根据产品发布事件排序
            var goods_list = this.data.goods_list
            for (var i = 0; i < goods_list.length; i++)
                for (var j = 0; j < goods_list.length - i - 1; j++)
                    if (goods_list[j][0].goods.create_time < goods_list[j + 1][0].goods.create_time) {
                        var temp = goods_list[j + 1]
                        goods_list[j + 1] = goods_list[j]
                        goods_list[j] = temp
                    }
            console.log(goods_list)
            this.setData({goods_list: goods_list})
        }


        // 点击筛选事件
        if (event.detail.index == 4) {
            this.setData({show_right: true});
        }
    },
    onSort: function (event) {
        // 点击类别事件
        // var id = goods.getDataset(event,id)
        var sort = event.currentTarget.dataset.sort
        // console.log(sort)
        goods.getGoodsDataBySort(sort, (res) => {
            this.setData({goods_list: res.data});
        })
        this.setData({show_left: false});
        this.setData({active: 0});  //标签栏位置设置回综合
        this.setData({price_label: 0}); //标签栏-价格显示状态设置回默认
    },
    onClassify: function (event) {
        // 点击分类事件
        var sort = event.currentTarget.dataset.sort
        var classify = event.currentTarget.dataset.classify
        console.log(sort)
        console.log(classify)
        goods.getGoodsDataByClassify(sort, classify, (res) => {
                this.setData({goods_list: res.data});
            }
        )
        this.setData({show_left: false});
        this.setData({active: 0});  //标签栏位置设置回综合
        this.setData({price_label: 0}); //标签栏-价格显示状态设置回默认
    },
    onAllGoods: function () {
        // 侧边栏全部商品点击事件
        this.getAllGoods();
        this.setData({show_left: false});
        this.setData({active: 0});  //标签栏位置设置回综合
        this.setData({price_label: 0}); //标签栏-价格显示状态设置回默认
    },
    getAllGoods: function () {
        goods.getGoodsData((res) => {
            this.setData({goods_list: res.data});
            // console.log(res.data)
        })
    }
})