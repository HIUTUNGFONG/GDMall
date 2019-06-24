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
        show_bottom: false,    //底部栏显示
        overlay_bottom: true,  //底部蒙层显示
        popup_data: '',       //左侧栏数据
        active: 0,            //标签栏激活索引
        price_label: 0,       //价格标签状态
        goods_list: '',       //产品列表
        is_query: 0,          //是否查询参数
        minPrice: 0,          //筛选最低价格
        maxPrice: 0,          //筛选最高价格
        current: 'goodspage',  //底部导航栏参数
        commodity_data: '',      //底部弹出栏参数
        commodityAttr: [],      //商品属性key
        attrValueList: [],       //商品属性值
        stepperAttr: 1


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
    onClosePopupBottom() {
        //点击底部蒙层时触发
        this.setData({
            show_bottom: false,
            code_style: '',  //清空code属性选择
            CodeColorAttr: '请选择尺码颜色',
            stepperAttr: 1      //步进器参数
        });
    },
    // 右侧筛选栏最小价格失去焦点事件
    minPrice(event) {
        this.setData({minPrice: event.detail.value})
        this.min_price = event.detail.value
        // console.log(this.data.minPrice)
    },
    // 右侧筛选栏最大价格失去焦点事件
    maxPrice(event) {
        this.setData({maxPrice: event.detail.value})
        this.max_price = event.detail.value
        // console.log(this.data.maxPrice)
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
        var goods_list = this.goods_list;
        // console.log(goods_list);
        var minPrice = this.min_price;
        // console.log(minPrice);
        var maxPrice = this.max_price;
        // console.log(maxPrice);
        var temp = [];
        if (minPrice == undefined && maxPrice == undefined || minPrice == '' && maxPrice == '') {
            temp = goods_list
            console.log(goods_list)
        } else if (minPrice == undefined || minPrice == '') {
            for (var i = 0; i < goods_list.length; i++) {
                var price = parseFloat(goods_list[i][0].commodity[0].price);
                if (price <= maxPrice) {
                    temp.push(goods_list[i])
                }
                // console.log(temp)
            }
        } else if (maxPrice == undefined || maxPrice == '') {
            for (var i = 0; i < goods_list.length; i++) {
                var price = parseFloat(goods_list[i][0].commodity[0].price);
                if (price >= minPrice) {
                    temp.push(goods_list[i])
                }
                // console.log(temp)
            }
        } else {
            for (var i = 0; i < goods_list.length; i++) {
                var price = parseFloat(goods_list[i][0].commodity[0].price);
                // console.log('商品价格'+price)
                // console.log(minPrice)
                // console.log(maxPrice)
                // console.log(temp)
                if (price >= minPrice && price <= maxPrice) {
                    temp.push(goods_list[i])
                }
                // console.log(temp)
            }
        }


        this.setData({goods_list: temp})
    },


    onChange(event) {
        // 标签栏

        // 点击综合事件
        if (event.detail.index == 0) {
            // 根据产品发布排序
            var goods_list = this.goods_list;
            for (var i = 0; i < goods_list.length; i++)
                for (var j = 0; j < goods_list.length - i - 1; j++)
                    if (goods_list[j][0].goods.create_time < goods_list[j + 1][0].goods.create_time) {
                        var temp = goods_list[j + 1];
                        goods_list[j + 1] = goods_list[j];
                        goods_list[j] = temp
                    }
            console.log(goods_list);
            this.setData({goods_list: goods_list})
        }

        // 点击销量事件
        if (event.detail.index == 1) {
            // 根据产品销量排序
            var goods_list = this.goods_list;
            for (var i = 0; i < goods_list.length; i++)
                for (var j = 0; j < goods_list.length - i - 1; j++)
                    if (goods_list[j][0].goods.sales < goods_list[j + 1][0].goods.sales) {
                        var temp = goods_list[j + 1];
                        goods_list[j + 1] = goods_list[j];
                        goods_list[j] = temp
                    }
            console.log(goods_list);
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
                var goods_list = this.goods_list;
                for (var i = 0; i < goods_list.length; i++)
                    for (var j = 0; j < goods_list.length - i - 1; j++)
                        if (goods_list[j][0].commodity[0].price > goods_list[j + 1][0].commodity[0].price) {
                            var temp = goods_list[j + 1];
                            goods_list[j + 1] = goods_list[j];
                            goods_list[j] = temp
                        }
                console.log(goods_list);
                this.setData({goods_list: goods_list});
                // 第二次点击取现在的相反值
                this.setData({price_label: -this.data.price_label});

            } else if (this.data.price_label == 1) {
                // 根据产品价格升序排序
                var goods_list = this.goods_list;
                for (var i = 0; i < goods_list.length; i++)
                    for (var j = 0; j < goods_list.length - i - 1; j++)
                        if (goods_list[j][0].commodity[0].price < goods_list[j + 1][0].commodity[0].price) {
                            var temp = goods_list[j + 1];
                            goods_list[j + 1] = goods_list[j];
                            goods_list[j] = temp
                        }
                console.log(goods_list);
                this.setData({goods_list: goods_list});
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
            var goods_list = this.goods_list;
            for (var i = 0; i < goods_list.length; i++)
                for (var j = 0; j < goods_list.length - i - 1; j++)
                    if (goods_list[j][0].goods.create_time < goods_list[j + 1][0].goods.create_time) {
                        var temp = goods_list[j + 1];
                        goods_list[j + 1] = goods_list[j];
                        goods_list[j] = temp
                    }
            console.log(goods_list);
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
        var sort = event.currentTarget.dataset.sort;
        // console.log(sort)
        goods.getGoodsDataBySort(sort, (res) => {
            this.setData({goods_list: res.data});
            this.goods_list = res.data;
        })
        this.setData({show_left: false});
        this.setData({active: 0});  //标签栏位置设置回综合
        this.setData({price_label: 0}); //标签栏-价格显示状态设置回默认
    },
    onClassify: function (event) {
        // 点击分类事件
        var sort = event.currentTarget.dataset.sort;
        var classify = event.currentTarget.dataset.classify;
        console.log(sort);
        console.log(classify);
        goods.getGoodsDataByClassify(sort, classify, (res) => {
                this.setData({goods_list: res.data});
                this.goods_list = res.data;
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
            this.goods_list = res.data
            // console.log(res.data)
        })
    },
    // 搜索框搜索事件
    onSearch: function (event) {
        var search_value = event.detail;
        console.log(search_value);
        goods.getGoodsDataBySearch(search_value, (res) => {
            this.setData({goods_list: res.data});
            console.log(res.data)
        })
    },
    //跳转到详情页
    onProduct: function (event) {
        var goodsId = event.currentTarget.dataset.goodsid;
        console.log(goodsId);
        wx.navigateTo({
            url: '../product/product?goodsId=' + goodsId,
        })
    },


    // 点击添加购物车图标事件
    onAddCommodity: function (event) {
        // 获取点击的产品信息
        var commodity = event.currentTarget.dataset.commodity;
        // console.log(commodity[0].goods.id);
        var goodsId = commodity[0].goods.id;
        this.attrValueList = [];
        this.stepperAttr = 1;       //步进器默认参数
        this.commodity_count = 0;   //商品总数量
        this.commodity_id = 0;     //全选后的商品id
        this.commodity_stock = 1;  //全选后的商品库存

        // 获取商品列表，选择元素列表
        goods.getCommodityList(goodsId, (res) => {


            // 获取总件数

            for (var i = 0; i < (res.data.commodity.length); i++) {
                this.commodity_count += res.data.commodity[i].stock
            }
            this.commodity_data = res.data;
            this.commodityAttr = res.data.commodityAttr;
            console.log(this.commodity_data);
            this.setData({
                'commodity_data': res.data,
                'commodity_count': this.commodity_count,
                'price': res.data.commodity[0].price,


            });

            this.setData({
                CodeColorAttr: '请选择尺码颜色',
                includeGroup: this.commodityAttr
            });

            this.distachAttrValue(this.commodityAttr);
            // 只有一个属性组合的时候默认选中
            if (this.commodityAttr.length == 1) {
                for (var i = 0; i < this.commodityAttr[0].attrValueList.length; i++) {
                    this.attrValueList[i].selectedValue = this.commodityAttr[0].attrValueList[i].attrValue;
                }
                this.setData({
                    attrValueList: this.attrValueList
                });


                var value = [];
                for (var i = 0; i < this.attrValueList.length; i++) {
                    if (!this.attrValueList[i].selectedValue) {
                        break;
                    }
                    value.push(this.attrValueList[i].selectedValue);
                }
                var valueStr = "";
                for (var i = 0; i < value.length; i++) {
                    valueStr += value[i] + ' ';
                }
                this.setData({'CodeColorAttr': valueStr});
                this.commodity_id = this.commodity_data.commodity[0].id;
            }
        })


        // 显示底部栏
        this.setData({
            show_bottom: true
        });
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


    // ---------------商品sku属性-----------------
    // /* 获取数据 */
    distachAttrValue: function (commodityAttr) {
        /**
         将后台返回的数据组合成类似
         {
      attrKey:'型号',
      attrValueList:['1','2','3']
      }
         */
            // 把数据对象的数据（视图使用），写到局部内
        var attrValueList = this.attrValueList;
        // 遍历获取的数据
        for (var i = 0; i < commodityAttr.length; i++) {
            for (var j = 0; j < commodityAttr[i].attrValueList.length; j++) {
                var attrIndex = this.getAttrIndex(commodityAttr[i].attrValueList[j].attrKey, attrValueList);
                // console.log('属性索引', attrIndex);
                // 如果还没有属性索引为-1，此时新增属性并设置属性值数组的第一个值；索引大于等于0，表示已存在的属性名的位置
                if (attrIndex >= 0) {
                    // 如果属性值数组中没有该值，push新值；否则不处理
                    if (!this.isValueExist(commodityAttr[i].attrValueList[j].attrValue, attrValueList[attrIndex].attrValues)) {
                        attrValueList[attrIndex].attrValues.push(commodityAttr[i].attrValueList[j].attrValue);
                    }
                } else {
                    attrValueList.push({
                        attrKey: commodityAttr[i].attrValueList[j].attrKey,
                        attrValues: [commodityAttr[i].attrValueList[j].attrValue]
                    });
                }
            }
        }
        // console.log('result', attrValueList)
        for (var i = 0; i < attrValueList.length; i++) {
            for (var j = 0; j < attrValueList[i].attrValues.length; j++) {
                if (attrValueList[i].attrValueStatus) {
                    attrValueList[i].attrValueStatus[j] = true;
                } else {
                    attrValueList[i].attrValueStatus = [];
                    attrValueList[i].attrValueStatus[j] = true;
                }
            }
        }
        this.setData({
            attrValueList: attrValueList
        });
    },
    getAttrIndex: function (attrName, attrValueList) {
        // 判断数组中的attrKey是否有该属性值
        for (var i = 0; i < attrValueList.length; i++) {
            if (attrName == attrValueList[i].attrKey) {
                break;
            }
        }
        return i < attrValueList.length ? i : -1;
    },
    isValueExist: function (value, valueArr) {
        // 判断是否已有属性值
        for (var i = 0; i < valueArr.length; i++) {
            if (valueArr[i] == value) {
                break;
            }
        }
        return i < valueArr.length;
    },
    /* 选择属性值事件 */
    selectAttrValue: function (e) {


        /*
        点选属性值，联动判断其他属性值是否可选
        {
        attrKey:'型号',
        attrValueList:['1','2','3'],
        selectedValue:'1',
        attrValueStatus:[true,true,true]
        }
        console.log(e.currentTarget.dataset);
        */
        var attrValueList = this.attrValueList;
        var index = e.currentTarget.dataset.index;//属性索引
        var key = e.currentTarget.dataset.key;
        var value = e.currentTarget.dataset.value;
        if (e.currentTarget.dataset.status || index == this.data.firstIndex) {
            if (e.currentTarget.dataset.selectedvalue == e.currentTarget.dataset.value) {
                // 取消选中
                this.disSelectValue(attrValueList, index, key, value);
            } else {
                // 选中
                this.selectValue(attrValueList, index, key, value);

            }

        }
    },
    /* 选中 */
    selectValue: function (attrValueList, index, key, value, unselectStatus) {
        // console.log('firstIndex', this.data.firstIndex);
        var includeGroup = [];
        if (index == this.data.firstIndex && !unselectStatus) { // 如果是第一个选中的属性值，则该属性所有值可选
            var commodityAttr = this.commodityAttr;
            // 其他选中的属性值全都置空
            // console.log('其他选中的属性值全都置空', index, this.data.firstIndex, !unselectStatus);
            for (var i = 0; i < attrValueList.length; i++) {
                for (var j = 0; j < attrValueList[i].attrValues.length; j++) {
                    attrValueList[i].selectedValue = '';
                }
            }
        } else {
            var commodityAttr = this.data.includeGroup;
        }

        // console.log('选中', commodityAttr, index, key, value);
        for (var i = 0; i < commodityAttr.length; i++) {
            for (var j = 0; j < commodityAttr[i].attrValueList.length; j++) {
                if (commodityAttr[i].attrValueList[j].attrKey == key && commodityAttr[i].attrValueList[j].attrValue == value) {
                    includeGroup.push(commodityAttr[i]);
                }
            }
        }
        attrValueList[index].selectedValue = value;

        // 判断属性是否可选
        for (var i = 0; i < attrValueList.length; i++) {
            for (var j = 0; j < attrValueList[i].attrValues.length; j++) {
                attrValueList[i].attrValueStatus[j] = false;
            }
        }
        for (var k = 0; k < attrValueList.length; k++) {
            for (var i = 0; i < includeGroup.length; i++) {
                for (var j = 0; j < includeGroup[i].attrValueList.length; j++) {
                    if (attrValueList[k].attrKey == includeGroup[i].attrValueList[j].attrKey) {
                        for (var m = 0; m < attrValueList[k].attrValues.length; m++) {
                            if (attrValueList[k].attrValues[m] == includeGroup[i].attrValueList[j].attrValue) {
                                attrValueList[k].attrValueStatus[m] = true;
                            }
                        }
                    }
                }
            }
        }
        // console.log('结果', attrValueList);
        this.setData({
            attrValueList: attrValueList,
            includeGroup: includeGroup
        });

        var count = 0;
        for (var i = 0; i < attrValueList.length; i++) {
            for (var j = 0; j < attrValueList[i].attrValues.length; j++) {
                if (attrValueList[i].selectedValue) {
                    count++;
                    break;
                }
            }
        }
        if (count < 2) {// 第一次选中，同属性的值都可选
            this.setData({
                firstIndex: index
            });
        } else {
            this.setData({
                firstIndex: -1
            });
            // console.log('两个属性都选择')
            var value = [];
            for (var i = 0; i < this.attrValueList.length; i++) {
                if (!this.attrValueList[i].selectedValue) {
                    break;
                }
                value.push(this.attrValueList[i].selectedValue);
            }
            var valueStr = "";
            for (var i = 0; i < value.length; i++) {
                valueStr += value[i] + ' ';
            }
            var arr = valueStr.split(' ');
            this.setData({'CodeColorAttr': valueStr});

            // 属性选择完毕后更新对应的价格
            for (var i = 0; i < this.commodity_data.commodity.length; i++) {

                if (this.commodity_data.commodity[i].code == arr[0] && this.commodity_data.commodity[i].color == arr[1]) {
                    this.commodity_id = this.commodity_data.commodity[i].id;
                    this.commodity_stock = this.commodity_data.commodity[i].stock;
                    this.setData({
                        'price': this.commodity_data.commodity[i].price,
                        'commodity_count': this.commodity_data.commodity[i].stock
                    })
                }
            }
        }

    },
    /* 取消选中 */
    disSelectValue: function (attrValueList, index, key, value) {
        this.stepperAttr = 1; //步进器初始化为1
        var commodityAttr = this.commodityAttr;
        attrValueList[index].selectedValue = '';

        // 判断属性是否可选
        for (var i = 0; i < attrValueList.length; i++) {
            for (var j = 0; j < attrValueList[i].attrValues.length; j++) {
                attrValueList[i].attrValueStatus[j] = true;
            }
        }
        // var commodity_count = 0;
        for (var i = 0; i < attrValueList.length; i++) {
            if (attrValueList[i].selectedValue) {
                this.selectValue(attrValueList, i, attrValueList[i].attrKey, attrValueList[i].selectedValue, true);
            }
        }
        // for (var j = 0; j < this.commodity_data.commodity.length; j++) {
        //     commodity_count += this.commodity_data.commodity[j].stock
        // }
        this.setData({
            price: this.commodity_data.commodity[0].price,
            stepperAttr: 1,
            commodity_count: this.commodity_count,
            CodeColorAttr: '请选择尺码颜色',
            includeGroup: commodityAttr,
            attrValueList: attrValueList
        })

    },
    //加入到购物车
    addCart: function (event) {
        var value = [];
        for (var i = 0; i < this.attrValueList.length; i++) {
            if (!this.attrValueList[i].selectedValue) {
                break;
            }
            value.push(this.attrValueList[i].selectedValue);
        }
        if (i < this.attrValueList.length) {
            wx.showToast({
                title: '请选择完整！',
                icon: 'loading',
                duration: 1000
            })
        } else {
            //加入购物车
            console.log(this.commodity_id)
            console.log(this.stepperAttr)
            goods.addCommdityToCart(this.commodity_id, this.stepperAttr, (res) => {
                var msg = res.msg
                if (msg == '商品库存不足') {
                    wx.showToast({
                        title: '库存不足',
                        image: '/icons/cross.png',
                        duration: 1000
                    })
                } else {
                    wx.showToast({
                        title: '成功加入购物车',
                        icon: 'success',
                        duration: 1000
                    })
                }
            })
        }
    },
    //提交订单
    toOrder: function (e) {
        var value = [];
        for (var i = 0; i < this.attrValueList.length; i++) {
            if (!this.attrValueList[i].selectedValue) {
                break;
            }
            value.push(this.attrValueList[i].selectedValue);
        }
        if (i < this.attrValueList.length) {
            wx.showToast({
                title: '请选择完整！',
                icon: 'loading',
                duration: 1000
            })
        } else {
            // 将数据放入缓存中
            // console.log(commodityId_list)
            // console.log(commodityCount_list)
            // wx.setStorageSync('commodityId_list', commodityId_list)
            // wx.setStorageSync('commodityCount_list', commodityCount_list)
            goods.getCommodityById(this.commodity_id,(res)=>{
                console.log(res.data)
                wx.setStorageSync('commodity_list', res.data);
                wx.setStorageSync('commodity_list_num', this.stepperAttr);


            })

            // 跳转到订单页面
            wx.navigateTo({
                url: '../order/order',
            })
        }
    },
    // 步进器点击事件
    onStepper: function (event) {
        this.stepperAttr = event.detail
    }
    //--------------------------------------------
})