from rest_framework.response import Response
from rest_framework.views import APIView

from apps.goods.models import *

import json

from apps.goods.serializers import *


class IndexView(APIView):
    '''
    首页内容加载
    '''

    def get(self, request):
        carousel = IndexCarousel.objects.filter(is_delete=False).order_by('index')
        vorb = IndexVideoOrBanner.objects.filter(is_delete=False)
        ics = IndexCarouselSerializers(carousel, many=True)
        ivobs = IndexVideoOrBannerlSerializers(vorb, many=True)
        data = {'ics': ics.data,
                'ivobs': ivobs.data}
        return Response(data)


class PopupListView(APIView):
    '''
    获取商品页面侧边栏内容
    '''

    def get(self, request):
        data = {}
        data_list = []
        # 查询产品表中的所有类别
        sort_list = Goods.objects.values('sort_id').distinct()
        # 查询产品表每个列别下的分类
        if sort_list:
            for sort in sort_list:
                classifys_data_list = []
                # 根据产品的sort_id查询对应sort类别表的id,name
                sort_data = Sort.objects.values('id', 'name').filter(id=sort['sort_id'])
                # 序列化
                sorts = SortSerializers(sort_data, many=True)
                # 获取产品sort_id一样下的classify_id
                classify_list = Goods.objects.values('classify_id').filter(sort_id=sort['sort_id']).distinct()
                for classify in classify_list:
                    # 根据classify_id获取classify分类表中的id,name信息
                    classify_data = Classify.objects.filter(id=classify['classify_id'])
                    # 序列化
                    classifys = ClassifySerializers(classify_data, many=True)
                    classifys_data_list.append(classifys.data)
                data_list.append({'sort': sorts.data,
                                  'classify': classifys_data_list})
            data = {'data': data_list}

        return Response(data)


class GoodsListView(APIView):
    '''
    获取产品列表
    '''
    def get(self,request):

        goods = Goods.objects.filter(is_delete=0).values()

        # 获取所有产品
        data_list = []

        for g in goods:
            # goods_image = GoodsImage.objects.filter(goods_id=g['id'],is_delete=0).values()
            goods_image = GoodsImageSerializers(GoodsImage.objects.filter(goods_id=g['id'],is_delete=0),many=True)
            commodity = Commodity.objects.filter(goods_id=g['id'],is_delete=0).values()
            sort = Sort.objects.filter(id=g['sort_id'],is_delete=0).values()
            classify = Classify.objects.filter(id=g['classify_id'],is_delete=0).values()
            data_list.append([{'goods':g,'goods_image':goods_image.data,'commodity':commodity,'sort':sort,'classify':classify}])

        data = {'data':data_list}
        return Response(data)


class GoodsListViewScreening(APIView):
    '''
    获取产品列表(条件筛选)sort-classify
    '''

    def get(self, request,type,id):
        if type =='sort':
            goods = Goods.objects.filter(is_delete=0,sort=id).values()
            print(goods)
        elif type == 'classify':
            goods = Goods.objects.filter(is_delete=0,classify=id).values()

        # 获取所有产品
        data_list = []

        for g in goods:
            # goods_image = GoodsImage.objects.filter(goods_id=g['id'],is_delete=0).values()
            goods_image = GoodsImageSerializers(GoodsImage.objects.filter(goods_id=g['id'],is_delete=0),many=True)
            commodity = Commodity.objects.filter(goods_id=g['id'],is_delete=0).values()
            sort = Sort.objects.filter(id=g['sort_id'],is_delete=0).values()
            classify = Classify.objects.filter(id=g['classify_id'],is_delete=0).values()
            data_list.append([{'goods':g,'goods_image':goods_image.data,'commodity':commodity,'sort':sort,'classify':classify}])

        data = {'data':data_list}
        return Response(data)



class CommodityListView(APIView):
    '''
    获取商品列表
    '''

    def get(self, request):
        commodity = Commodity.objects.all()
        cs = CommoditySerializers(commodity, many=True)
        data = {'data': cs.data}
        return Response(data)
























