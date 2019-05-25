from django.urls import re_path,path

from apps.cart.views import *
from apps.user.views import *

app_name = 'cart'

urlpatterns = [
    path('cart/add/', CartAddView.as_view(), name='add'),  # 购物车记录添加

]
