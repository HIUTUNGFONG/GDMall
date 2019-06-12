from django.urls import re_path,path

from apps.pay.views import *

app_name = 'pay'

urlpatterns = [
    path('toPay',WxPay.as_view(),name='WxPay')
]
