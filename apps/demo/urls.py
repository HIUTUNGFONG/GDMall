from django.urls import re_path,path

from apps.demo.views import *

app_name = 'demo'

urlpatterns = [
    re_path('bdtoken/(?P<client_id>.*)/(?P<client_secret>.*)', DemoView.as_view(), name='demo'),  # GET查询
]
