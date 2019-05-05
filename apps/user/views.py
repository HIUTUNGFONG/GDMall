import os

import requests
from rest_framework.response import Response
from rest_framework.views import APIView

from django_redis import get_redis_connection

class TokenView(APIView):
    '''
    Token认证令牌
    '''

    def get(self,request, code):
        # 生成一个随机3rd_session
        session_key = os.popen('head -n 80 /dev/urandom | tr -dc A-Za-z0-9 | head -c 64').read()
        app_id = 'wxd2352a7b57c51606'
        app_secret = 'ef6117603e0cd75c1b280f35ed288994'
        url = 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'%(app_id,app_secret,code)
        result = requests.get(url)
        data = result.json()
        print(result)

        # 获取redis连接
        conn = get_redis_connection('default')
        conn.set(session_key,data['openid'] + data['session_key'],timeout=604800)


        return Response(data)

