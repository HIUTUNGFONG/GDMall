from django.urls import re_path,path

from apps.card.views import *

app_name = 'cart'

urlpatterns = [
    re_path('card/get/(?P<token>.*)', CardView.as_view(), name='CardView'),
    re_path('getcard/(?P<token>.*)', GetCardCountView.as_view(), name='GetCardCountView'),
    re_path('card/user/get/(?P<token>.*)', UserCardView.as_view(), name='UserCardView'),
    path('card/add',AddCardView.as_view(), name='AddCardView'),

]
