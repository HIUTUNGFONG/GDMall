from django.urls import re_path,path

from apps.order.views import *

app_name = 'order'

urlpatterns = [
    path('order/create', CreateOrderView.as_view(), name='CreateOrderView'),  # POST
    path('order/get', OrderView.as_view(), name='OrderView'),  # GET

]
