from django.urls import re_path,path

from apps.user.views import TokenView

app_name = 'user'

urlpatterns = [
    path('/banner', TokenView.as_view(), name='getBanner'),  # GET
]
