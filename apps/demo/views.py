import json

import requests

from rest_framework.response import Response
from rest_framework.views import APIView


class DemoView(APIView):

    def post(self,request):
        # , client_id, client_secret, dev_pid, cuid,
        data = json.loads(request.body)['data']
        client_id = data['client_id']
        client_secret = data['client_secret']
        dev_pid = data['dev_pid']
        cuid = data['cuid']
        blobdata = data['blobdata']

        url = 'https://aip.baidubce.com/oauth/2.0/token?client_id='+ client_id+'&client_secret='+client_secret+'&grant_type=client_credentials'
        data = requests.get(url).json()
        token = data['refresh_token']
        url2 = 'http://vop.baidu.com/server_api?dev_pid='+dev_pid+'&cuid='+cuid+'&token='+token
        headers = {'ContentType': "audio/pcm;rate=16000"}
        result = requests.post(url2,data=blobdata, headers=headers)

        return Response(result.json())
