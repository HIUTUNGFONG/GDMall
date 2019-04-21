from django.urls import re_path,path

from apps.goods.views import IndexView

app_name = 'goods'

urlpatterns = [
    path('banner/', IndexView.as_view(), name='IndexView'),  # GET
]
