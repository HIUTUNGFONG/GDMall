from django.urls import re_path,path

from apps.user.views import *

app_name = 'user'

urlpatterns = [
    # re_path('getToken/(?P<code>.*)', TokenView.as_view(), name='getToken'),  # GET获取微信openid
    re_path('findRedisToken/(?P<token>.*)', RedisTokenView.as_view(), name='getRedisToken'),  # GET查询Redis的token
    path('createUser', CreateUserView.as_view(), name='createUser'),  # POST 查询并创建WxUser
    re_path('address/get/(?P<token>.*)', AddressView.as_view(), name='getAdddressList'),  # GET获取用户地址
    path('address/add', AddressView.as_view(), name='createAddress'),  # POST添加用户地址
    path('address/delete', DeleteAddress.as_view(), name='deleteAddress'),  # POST删除用户地址
    path('address/update/default', UpdateDefault.as_view(), name='updateAddress'),  # GET修改用户默认地址
    path('address/update', UpdateAddress.as_view(), name='updateAddress'),  # POST修改用户地址
]
