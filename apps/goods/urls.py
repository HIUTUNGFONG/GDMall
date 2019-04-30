from django.urls import re_path,path

from apps.goods.views import *

app_name = 'goods'

urlpatterns = [
    path('banner/', IndexView.as_view(), name='IndexView'),  # GET
    path('popup/', PopupListView.as_view(), name='PopupListView'),  # GET
    path('goods', GoodsListView.as_view(), name='GoodsListsView'),  # GET
    re_path('goods/(?P<sort_id>\d)/(?P<classify_id>\d)', GoodsListViewByClassify.as_view(), name='GoodsListViewByClassify'),  # GET
    re_path('goods/(?P<sort_id>\d)', GoodsListViewBySort.as_view(), name='GoodsListViewScreening'),  # GET
    path('commodity/', CommodityListView.as_view(), name='CommodityListView'),  # GET
]
