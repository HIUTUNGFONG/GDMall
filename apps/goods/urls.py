from django.urls import re_path,path

from apps.goods.views import *

app_name = 'goods'

urlpatterns = [
    path('banner/', IndexView.as_view(), name='IndexView'),  # GET
    path('popup/', PopupListView.as_view(), name='PopupListView'),  # GET
    path('goods', GoodsListView.as_view(), name='GoodsListsView'),  # GET
    re_path('goods/id/(?P<goods_id>.*)', GoodsListViewById.as_view(), name='GoodsListsViewById'),  # GET
    re_path('goods/(?P<sort_id>.*)/(?P<classify_id>.*)', GoodsListViewByClassify.as_view(), name='GoodsListViewByClassify'),  # GET
    re_path('goods/(?P<sort_id>.*)', GoodsListViewBySort.as_view(), name='GoodsListViewScreening'),  # GET
    path('goods/search', GoodsListViewBySearch.as_view(), name='GoodsListViewBySearch'),  # POST 查询关键字产品
    re_path('goods/attribute/(?P<goods_id>.*)', GoodsAttributeView.as_view(), name='GoodsAttributeView'),  # GET 查询产品属性
    re_path('commodity/get/(?P<commodity_id>.*)', CommodityListView.as_view(), name='CommodityListView'),  # GET
    re_path('commodity/(?P<goods_id>.*)', CommodityListViewByGoodsId.as_view(), name='CommodityListViewByGoodsId'), # GET
    path('get/background', UserBackgroundView.as_view(), name='UserBackground'),  # 获取背景图

]
