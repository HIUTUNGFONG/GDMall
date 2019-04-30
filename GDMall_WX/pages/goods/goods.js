
import {Goods} from './goods-model.js'

var goods = new Goods();

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    show_left: false,     //左侧栏显示
    overlay_left:true,    //左侧蒙层显示
    show_right: false,    //右侧栏显示
    overlay_rigth: true,  //右侧蒙层显示
    popup_data:'',        //左侧栏数据
    price_label:0,         //价格标签状态
    goods_list:''         //产品列表
  },

  attached(){
    // 查询左侧类别分类栏
    goods.getPopupData((res) => {
      this.setData({'popup': res.data})
      console.log(res.data)
    });

    // 查询产品列表
    goods.getGoodsData((res)=>{
      this.setData({ goods_list: res.data });
      // console.log(res.data)
    })

  },
  /**
   * 组件的方法列表
   */
  methods: {

    onShowPopup: function () {
      // 显示侧边栏,查询类别和分类
      this.setData({
        show_left: true
      });
      
    },
    onClosePopupLeft() {
      //点击左侧蒙层时触发
      this.setData({ show_left: false });
    },
    onClosePopupRight() {
      //点击左侧蒙层时触发
      this.setData({ show_right: false });
    },
    
    onChange(event) {
      // 标签栏
      // 点击价格事件
      if (event.detail.index == 2) {
        if(this.data.price_label == 0){
          // 第一次点击设置成^
          this.setData({price_label: 1})
        }else{
          // 第二次点击取现在的相反值
          this.setData({ price_label: - this.data.price_label });
        }
      }else{
        // 点击其他改变回原值
        this.setData({ price_label:0 });
      }

      // 点击筛选事件
      if(event.detail.index==4){
        this.setData({ show_right: true });
      }
    },
    onSort: function(event){
      // 点击类别事件
      // var id = goods.getDataset(event,id)
      var sort = event.currentTarget.dataset.sort
      console.log(sort)
      goods.getGoodsDataBySort(sort, (res) =>{
          this.setData({ goods_list: res.data });
        }
      )
    },
    onClassify: function(event){
      // 点击分类事件
      // var id = goods.getDataset(event,id)
      // var id = event.currentTarget.dataset.id
      var sort = event.currentTarget.dataset.sort
      var classify = event.currentTarget.dataset.classify
      console.log(sort)
      console.log(classify)
      goods.getGoodsDataByClassify(sort,classify, (res) =>{
          this.setData({ goods_list: res.data });
        }
      )
    }

    

  }
})
