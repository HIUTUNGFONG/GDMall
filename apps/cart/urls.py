from django.urls import re_path,path

from apps.cart.views import *
from apps.user.views import *

app_name = 'cart'

urlpatterns = [
    path('cart/add', CartAddView.as_view(), name='add'),  # 购物车记录添加
    re_path('cart/get/(?P<token>\*)', CartInfoView.as_view(), name='getlist'),  # 获取购物车商品列表
    path('cart/updata', CartUpdateView.as_view(), name='updata'),  # 更新购物车商品
    path('cart/delete', CartDeleteView.as_view(), name='delete'),  # 删除购物车商品
]
