from django.http import HttpResponse
from django.shortcuts import render
import requests

# Create your views here.
from django.views import View


class TokenView(View):
    '''
    Token认证令牌
    '''

    def get(self,request, code):
        app_id = 'wxd2352a7b57c51606'
        app_secret = 'ef6117603e0cd75c1b280f35ed288994'
        url = 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'%(app_id,app_secret,code)
        result = requests.get(url)
        data = result.json()
        print(result)
        # print(data['session_key'])
        # print(data['openid'])
        # print(data['errcode'])
        # print(data['errmsg'])
        return HttpResponse(result)

