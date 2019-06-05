import json
import os

import requests
from django.db.models import Q
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
        result = str(conn.get(data['token']))
        # 获取openid
        openid = result.split('$$$$')[0]
        print(openid)
        # openid = data['openid']
        # 获取session
        session = result.split('$$$$')[1]
        print(session)
        # session = data['session']
        # 判断数据库是否存在该openid
        user = WxUser.objects.filter(openid=openid)
        # 存在：返回用户已存在msg
        if user:
            data = {'msg': '用户已存在'}
            return Response(data)
        # 不存在：
        # 添加到用户表
        WxUser.objects.create(openid=openid).save()
        data = {'msg': 'success'}
        return Response(data)

class RedisTokenView(APIView):

    '''
    GET：查询Redis中是否存在WxUser
    '''
    def get(self,request,token):
        conn = get_redis_connection('UserToken')
        result = conn.get(token)
        if result:
            return Response({'msg': 'success'})
        return Response({'msg': 'failure'})



class AddressView(APIView):

    '''
    获取用户收货地址
    '''
    def get(self,request,token):
        conn_ut = get_redis_connection('UserToken')
        result = str(conn_ut.get(token))
        openid = result.split('$$$$')[0]
        if result:
            address_list = Address.objects.filter(openid=openid).values()
            return Response({'address_list':address_list})
        return Response({'err':'no_user'})

    '''
    新增用户收货地址
    '''
    def post(self,request):
        # 获取请求数据
        data = request.body
        data = json.loads(data)
        token = data['token']
        name = data['name']
        phone = data['phone']
        address = data['address']
        address_code = data['address_code']
        is_default = data['is_default']

        # 数据校验
        if not all([token,name,phone,address,address_code]):
            return Response({'errmsg': '数据不完整'})

        conn_ut = get_redis_connection('UserToken')
        result = str(conn_ut.get(token))
        openid = result.split('$$$$')[0]
        if result:
            obj = Address.objects.create(openid=openid,addressee=name,phone=phone,address=address,address_code=address_code,is_default=is_default)
            obj.save()
            if(is_default):
                Address.objects.filter(Q(openid=openid)&Q(is_default=True)&~Q(id=obj.id)&Q(is_delete=False)).updata(is_default=False)
            return Response({'msg':'success'})
        return Response({'err': 'no_user'})

