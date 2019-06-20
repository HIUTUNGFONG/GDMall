from django.urls import re_path,path

from apps.order.views import *

app_name = 'order'

urlpatterns = [
    path('order/create', CreateOrderView.as_view(), name='CreateOrderView'),  # POST 创建订单
    re_path('order/get/(?P<token>.*)', OrderView.as_view(), name='OrderView'),  # GET 获取订单
    path('order/get', OrderView.as_view(), name='OrderView'),  # POST 获取订单清单
    path('order/getById', OrderByOrderIdView.as_view(), name='OrderByOrderIdView'),  # POST 获取订单清单
    path('order/del', DeleteOrderView.as_view(), name='DeleteOrderView'),  # POST 删除订单
    path('order/confirm', ConfirmOrderView.as_view(), name='ConfirmOrderView'),  # POST 确认收货
    path('order/returns', ReturnsOrderView.as_view(), name='ReturnsOrderView'),  # POST 申请退货
    path('order/clean', CleanInvalidOrderView.as_view(), name='CleanInvalidOrderView'),  # POST 清除过期未支付订单

]
