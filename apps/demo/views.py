import requests

from rest_framework.response import Response
from rest_framework.views import APIView


class DemoView(APIView):

    def get(self,request,client_id,client_secret):

        url = 'https://aip.baidubce.com/oauth/2.0/token?client_id='+ client_id+'&client_secret='+client_secret+'&grant_type=client_credentials'
        data = requests.get(url).json()

        return Response(data)
