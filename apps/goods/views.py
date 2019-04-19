from django.shortcuts import render
from django.views import View

from apps.goods.models import *


class IndexView(View):
    '''
    首页
    '''

    def get(self, request):
        # 获取轮播图信息
        carousel = IndexCarousel.objects.all().order_by('index')

        # 组织上下文
        context = {'carousel': carousel}

        return render(request, context)
