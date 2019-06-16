import json
import os

import requests
from django.db.models import Q
from rest_framework.response import Response
from rest_framework.views import APIView
from django_redis import get_redis_connection

from apps.user.models import *
from common.public_function import PublicFunction


class CreateUserView(APIView):
    '''
    根据code换取openid、session_key，查找wx_user表是否存在该wx用户
    '''

    def post(self,request):
        # 获取请求数据
        data = request.body
        data = json.loads(data)
        code = data['code']
        # 获取open_id、session_key
        data = PublicFunction().getOpenIdAndSessionKey(code)
        open_id = data[0]
        session_key = data[1]
        # 如果获取的open_id不为空
        if open_id:
            # 查找是否存在该wx用户
            try:
                # 存在用户，直接返回token
                wx_user = WxUser.objects.get(open_id=open_id)
                data = PublicFunction().createRedisToken(open_id, session_key)
            except:
                # 创建用户，返回token
                WxUser.objects.create(open_id=open_id).save()
                data = PublicFunction().createRedisToken(open_id, session_key)
        return Response(data)



class RedisTokenView(APIView):
    '''
    GET：查询Redis中是否存Token
    '''

    def get(self, request, token):
        conn = get_redis_connection('UserToken')
        result = conn.get(token)
        if result:
            return Response({'msg': 'success'})
        return Response({'msg': 'fail'})


class AddressView(APIView):
    '''
    获取用户收货地址
    '''

    def get(self, request, token):
        # 获取open_id
        open_id = PublicFunction().getOpenIdByToken(token)
        if open_id:
            try:
                wx_user = WxUser.objects.get(open_id=open_id)
            except:
                return Response({'msg': '用户不存在'})
            address_list = Address.objects.filter(wx_user=wx_user, is_delete=False).order_by('-is_default').values()
            return Response({'address_list': address_list})
        return Response({'err': 'no_user'})

    '''
    新增用户收货地址
    '''

    def post(self, request):
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
        if not all([token, name, phone, address]):
            return Response({'msg': '数据不完整'})
        # 获取open_id
        open_id = PublicFunction().getOpenIdByToken(token)
        if open_id:
            try:
                wx_user = WxUser.objects.get(open_id=open_id)
            except:
                return Response({'msg': '用户不存在'})

            try:
                if (is_default):
                    Address.objects.filter(Q(wx_user=wx_user) & Q(is_default=True) & Q(is_delete=False)).update(
                        is_default=False)
                Address.objects.create(wx_user=wx_user, name=name, phone=phone, address=address,
                                       address_code=address_code, is_default=is_default).save()
                return Response({'msg': 'success'})
            except:
                return Response({'msg': '新增地址失败'})
        return Response({'msg': '没有该用户，添加地址失败'})


class DeleteAddress(APIView):
    '''
    删除用户地址
    '''

    def post(self, request):
        # 获取请求数据
        data = request.body
        data = json.loads(data)
        token = data['token']
        address_id = data['address_id']

        # 数据校验
        if not all([token, address_id]):
            return Response({'errmsg': '数据不完整'})

        # 获取open_id
        open_id = PublicFunction().getOpenIdByToken(token)
        if open_id:
            try:
                wx_user = WxUser.objects.get(open_id=open_id)
            except:
                return Response({'msg': '用户不存在'})
            # 伪删除
            Address.objects.filter(wx_user=wx_user, id=address_id).update(is_delete=True)
            return Response({'msg': 'success'})
        return Response({'err': 'no_user'})


class UpdateAddress(APIView):
    '''
    修改用户地址
    '''

    def post(self, request):
        # 获取请求数据
        data = request.body
        data = json.loads(data)
        token = data['token']
        address_id = data['address_id']
        name = data['name']
        phone = data['phone']
        address = data['address']
        address_code = data['address_code']
        is_default = data['is_default']

        # 数据校验
        if not all([token, address_id, name, phone, address]):
            return Response({'errmsg': '数据不完整'})

        # 获取open_id
        open_id = PublicFunction().getOpenIdByToken(token)
        if open_id:
            try:
                wx_user = WxUser.objects.get(open_id=open_id)
            except:
                return Response({'msg': '用户不存在'})
            if (is_default):
                Address.objects.filter(Q(wx_user=wx_user) & Q(is_default=True) & Q(is_delete=False)).update(
                    is_default=False)
            Address.objects.filter(id=address_id).update(wx_user=wx_user, name=name, phone=phone, address=address,
                                                         address_code=address_code, is_default=is_default)

            return Response({'msg': 'success'})
        return Response({'err': 'no_user'})


class UpdateDefault(APIView):
    '''
    设为默认地址
    '''

    def post(self, request):
        # 获取请求数据
        data = request.body
        data = json.loads(data)
        token = data['token']
        address_id = data['address_id']
        # 获取open_id
        open_id = PublicFunction().getOpenIdByToken(token)
        if open_id:
            try:
                wx_user = WxUser.objects.get(open_id=open_id)
            except:
                return Response({'msg': '用户不存在'})
            Address.objects.filter(Q(wx_user=wx_user) & Q(is_default=True) & Q(is_delete=False)).update(is_default=False)
            Address.objects.filter(id=address_id).update(is_default=True)
            return Response({'msg': 'success'})
        return Response({'err': 'no_user'})
