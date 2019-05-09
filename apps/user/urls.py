from django.urls import re_path,path

from apps.user.views import *

app_name = 'user'

urlpatterns = [
    re_path('getToken/(?P<code>.*)', TokenView.as_view(), name='getToken'),  # GET获取微信openid
    path('createUser/', CreateUser.as_view(), name='createUser'),  # POST添加用户
]
