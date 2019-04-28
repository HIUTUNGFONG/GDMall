from django.urls import re_path,path

from apps.goods.views import *

app_name = 'goods'

urlpatterns = [
    path('banner/', IndexView.as_view(), name='IndexView'),  # GET
    path('popup/', PopupListView.as_view(), name='PopupListView'),  # GET
    path('goods/', GoodsListView.as_view(), name='GoodsListView'),  # GET
    path('commodity/', CommodityListView.as_view(), name='CommodityListView'),  # GET
]
