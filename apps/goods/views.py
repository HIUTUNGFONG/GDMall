from rest_framework.response import Response
from rest_framework.views import APIView

from apps.goods.models import *

import json

from apps.goods.serializers import *


class IndexView(APIView):
    '''
    首页
    '''

    def get(self, request):
        carousel = IndexCarousel.objects.filter(is_delete=False).order_by('index')
        vorb = IndexVideoOrBanner.objects.filter(is_delete=False)
        ics = IndexCarouselSerializers(carousel, many=True)
        ivobs = IndexVideoOrBannerlSerializers(vorb, many=True)
        return Response(ics.data,ivobs.data)