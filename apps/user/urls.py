from django.urls import re_path,path

from apps.user.views import *

app_name = 'user'

urlpatterns = [
    re_path('getToken/(?P<code>.*)', TokenView.as_view(), name='getToken'),  # GET获取微信openid
    re_path('getRedisToken/(?P<token>.*)', RedisTokenView.as_view(), name='getRedisToken'),  # GET查询Redis的token
    path('createUser', CreateUserView.as_view(), name='createUser'),  # POST添加用户
    re_path('addr/(?P<token>.*)', AddressView.as_view(), name='getAdddressList'),  # GET获取用户地址
    path('addr', AddressView.as_view(), name='createAddress'),  # POST添加用户地址
]
