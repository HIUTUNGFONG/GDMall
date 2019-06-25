from django.urls import re_path,path

from apps.card.views import *

app_name = 'cart'

urlpatterns = [
    re_path('card/get/(?P<token>.*)', CardView.as_view(), name='CardView'),
    path('card/add',AddCardView.as_view(), name='AddCardView'),

]
