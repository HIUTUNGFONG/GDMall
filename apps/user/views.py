import json
import os

import requests
from rest_framework.response import Response
from rest_framework.views import APIView
from django_redis import get_redis_connection

from apps.user.models import *


class TokenView(APIView):
    '''
    Token认证令牌
    '''

    def get(self, request, code):
        # 生成一个随机3rd_session
        session_key = os.popen('head -n 80 /dev/urandom | tr -dc A-Za-z0-9 | head -c 64').read()
        app_id = 'wxd2352a7b57c51606'
        app_secret = 'ef6117603e0cd75c1b280f35ed288994'
        url = 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code' % (
        app_id, app_secret, code)
        result = requests.get(url).json()

        # 获取redis连接
        conn = get_redis_connection('UserToken')
        conn.set(session_key, result['openid'] + '$$$$' + result['session_key'])
        # 设置过期时间7天
        conn.expire(session_key, 60 * 60 * 24 * 7)
        data = {'token': session_key}

        return Response(data)


class CreateUserView(APIView):
    '''
    POST:创建用户
    '''

    def post(self, request):
        # 获取请求数据
        data = request.body
        data = json.loads(data)
        data = data['Data']
        # 获取redis连接
        conn = get_redis_connection('UserToken')
        result = conn.keys(data['token'])
        # # 获取openid
        # openid = result.split('$$$$')[0]
        # print(openid)
        # # openid = data['openid']
        # # 获取session
        # session = result.split('$$$$')[1]
        # print(session)
        # # session = data['session']
        # # 判断数据库是否存在该openid
        # user = WxUser.objects.filter(openid=openid)
        # # 存在：返回用户已存在msg
        # if user:
        #     data = {'msg': '用户已存在'}
        #     return Response(data)
        # # 不存在：
        # # 添加到用户表
        # WxUser.objects.create(openid=openid).save()
        # data = {'msg': 'success'}
        return Response({'data':result})

class RedisTokenView(APIView):

    '''
    GET：查询Redis中是否存在WxUser
    '''
    def get(self,request,token):
        print(token)
        conn = get_redis_connection('UserToken')
        result = conn.get(token)
        print(result)
        if result:
            return Response({'msg': 'success'})
        return Response({'msg': 'failure'})
