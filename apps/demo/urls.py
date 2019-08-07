from django.urls import re_path,path

from apps.demo.views import *

app_name = 'demo'

urlpatterns = [
    path('bdai', DemoView.as_view(), name='demo'),  # POST
]
