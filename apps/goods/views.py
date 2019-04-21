from rest_framework.response import Response
from rest_framework.views import APIView

from apps.goods.models import *

import json

from apps.goods.serializers import IndexCarouselSerializers


class IndexView(APIView):
    '''
    首页
    '''

    def get(self, request):
        carousel = IndexCarousel.objects.all().order_by('index')
        serializers = IndexCarouselSerializers(carousel, many=True)
        return Response(serializers.data)