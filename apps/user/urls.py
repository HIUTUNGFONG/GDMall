from django.urls import re_path

from apps.user.views import TokenView

app_name = 'user'

urlpatterns = [
    re_path('getToken/(?P<code>.*)', TokenView.as_view(), name='getToken'),  # GET获取微信openid
]
