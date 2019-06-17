from django.urls import re_path,path

from apps.order.views import *

app_name = 'order'

urlpatterns = [
    path('order/create', CreateOrderView.as_view(), name='CreateOrderView'),  # POST 创建订单
    path('order/get', OrderView.as_view(), name='OrderView'),  # GET 获取订单
    path('order/del', DeleteOrderView.as_view(), name='DeleteOrderView'),  # POST 删除订单
    path('order/clean', CleanInvalidOrderView.as_view(), name='CleanInvalidOrderView'),  # POST 清除过期未支付订单

]
