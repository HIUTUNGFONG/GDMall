from django.urls import re_path,path

from apps.pay.views import *

app_name = 'pay'

urlpatterns = [
    path('toPay',WxPayView.as_view(),name='WxPayView'),
    path('pay/get',PayView.as_view(),name='PayView')
]
