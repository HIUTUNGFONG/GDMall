from django.urls import re_path,path

from apps.user.views import *

app_name = 'cart'

urlpatterns = [
    path('addCommodity', TokenView.as_view(), name='getToken')
]
