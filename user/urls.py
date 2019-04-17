from django.urls import path, re_path
from user.views import *

app_name = 'user'

urlpatterns = [
    re_path('getToken/(?P<code>.*)', TokenView.as_view(), name='getToken'),  # GET获取微信openid
]
