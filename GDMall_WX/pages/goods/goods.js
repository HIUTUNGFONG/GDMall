
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
    price_label:0         //价格标签状态
  },

  attached(){
    // 查询左侧类别分类栏
    goods.getPopupData((res) => {
      // console.log(res.data)
      this.setData({
        'popup': res.data
      })
    });

    // 查询产品列表
    goods.getGoodsData((res)=>{
      // console.log(res.data)
      // this.setData({'goods_list':res.data});
      // 整理后端json格式
      var data_list = []
      for (var i = 0; i < res.data.goods.length; i++) {
        data_list.push({'goods':res.data.goods[i],'goods_img':res.data.goods_img[i]})
      }
      this.setData({ 'goods_list': data_list });
      console.log(data_list)
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

      //if(event.detail.index!=4){ last_index = event.detail.index;}
      // 点击价格事件
      if (event.detail.index == 2) {
        if(this.data.price_label == 0){
          this.setData({price_label: 1})
          console.log(this.data.price_label)
        }else{
          this.setData({ price_label: - this.data.price_label });
          console.log(this.data.price_label)
        }
       
      }

      // 点击筛选事件
      if(event.detail.index==4){
        this.setData({ show_right: true });
      }
    }

  }
})
