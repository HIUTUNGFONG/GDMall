

import requests
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.cache import cache
from common.public_function import PublicFunction

class TokenView(APIView):
    '''
    Token认证令牌
    '''

    def get(self,request, code):
        # 生成一个随机3rd_session
        session_key = PublicFunction.get3rd_session()
        app_id = 'wxd2352a7b57c51606'
        app_secret = 'ef6117603e0cd75c1b280f35ed288994'
        url = 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'%(app_id,app_secret,code)
        result = requests.get(url)
        data = result.json()
        print(result)

        cache.set(session_key,data['openid'],60)

        return Response(data)

