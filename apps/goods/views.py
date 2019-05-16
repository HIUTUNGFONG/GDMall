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
                    classify_data = Classify.objects.filter(id=classify['classify_id']).values()
                    # 将sort_id添加进classify中
                    for c in classify_data:
                        c['sort_id'] = sort['sort_id']
                    classifys_data_list.append(classify_data)

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
            goods_image = GoodsImageSerializers(GoodsImage.objects.filter(goods_id=g['id'],is_delete=0),many=True)
            commodity = CommoditySerializers(Commodity.objects.filter(goods_id=g['id'],is_delete=0),many=True)
            sort = Sort.objects.filter(id=g['sort_id'],is_delete=0).values()
            classify = Classify.objects.filter(id=g['classify_id'],is_delete=0).values()
            data_list.append([{'goods':g,'goods_image':goods_image.data,'commodity':commodity.data,'sort':sort,'classify':classify}])

        data = {'data':data_list}
        return Response(data)



class GoodsListViewBySort(APIView):
    '''
    获取产品列表(条件筛选)sort
    '''

    def get(self, request,sort_id):
        goods = Goods.objects.filter(is_delete=0,sort=sort_id).values()



        # 获取所有产品
        data_list = []

        for g in goods:
            goods_image = GoodsImageSerializers(GoodsImage.objects.filter(goods_id=g['id'],is_delete=0),many=True)
            commodity = CommoditySerializers(Commodity.objects.filter(goods_id=g['id'],is_delete=0),many=True)
            sort = Sort.objects.filter(id=g['sort_id'],is_delete=0).values()
            classify = Classify.objects.filter(id=g['classify_id'],is_delete=0).values()
            data_list.append([{'goods':g,'goods_image':goods_image.data,'commodity':commodity.data,'sort':sort,'classify':classify}])

        data = {'data':data_list}
        return Response(data)


class GoodsListViewByClassify(APIView):
    '''
    获取产品列表(条件筛选)classify
    '''

    def get(self, request,sort_id,classify_id):
        print(sort_id)
        print(classify_id)

        goods = Goods.objects.filter(is_delete=0,sort=sort_id,classify=classify_id).values()

        # 获取所有产品
        data_list = []

        for g in goods:
            goods_image = GoodsImageSerializers(GoodsImage.objects.filter(goods_id=g['id'],is_delete=0),many=True)
            commodity = CommoditySerializers(Commodity.objects.filter(goods_id=g['id'],is_delete=0),many=True)
            sort = Sort.objects.filter(id=g['sort_id'],is_delete=0).values()
            classify = Classify.objects.filter(id=g['classify_id'],is_delete=0).values()
            data_list.append([{'goods':g,'goods_image':goods_image.data,'commodity':commodity.data,'sort':sort,'classify':classify}])

        data = {'data':data_list}
        return Response(data)

class GoodsListViewBySearch(APIView):
    '''
    获取产品列表(条件筛选)search
    '''

    def post(self, request):

        # 获取请求数据
        data = request.body
        data = json.loads(data)
        data = data['Data']
        print(data)
        goods = Goods.objects.filter(is_delete=0,title__icontains=data).values()

        # 获取所有产品
        data_list = []

        for g in goods:
            goods_image = GoodsImageSerializers(GoodsImage.objects.filter(goods_id=g['id'],is_delete=0),many=True)
            commodity = CommoditySerializers(Commodity.objects.filter(goods_id=g['id'],is_delete=0),many=True)
            sort = Sort.objects.filter(id=g['sort_id'],is_delete=0).values()
            classify = Classify.objects.filter(id=g['classify_id'],is_delete=0).values()
            data_list.append([{'goods':g,'goods_image':goods_image.data,'commodity':commodity.data,'sort':sort,'classify':classify}])

        data = {'data':data_list}
        return Response(data)

class CommodityListViewByGoodsId(APIView):
    '''
    获取商品列表(条件筛选)goods_id
    '''

    def get(self, request,goods_id):
        # 根据goodsId获取对应的goods
        goods = Goods.objects.filter(is_delete=0,id=goods_id).values()
        # 根据goodsId获取对应的商品
        commodity = Commodity.objects.filter(goods_id=goods_id,is_delete=0).values()
        code_list = set()
        color_list = set()
        code_dict = {}
        color_dict = {}
        for c in commodity:
            code_list.add(c.code)
            color_list.add(c.color)
            if (c.code in code_dict.keys()):
                code_dict[c.code].append(c.color)
            else:
                code_dict[c.code] = [c.color]
            if (c.color in color_dict.keys()):
                code_dict[c.color].append(c.code)
            else:
                code_dict[c.color] = [c.code]
        # dict去重
        for code in code_dict:
            code_dict[code] = set(code_dict[code])
        for color in color_dict:
            color_dict[color] = set(color_dict[color])
        choose_element = {'code_list':code_list,'color_list':color_list,'code_dict':code_dict,'color_dict':color_dict}


        # goods_image = GoodsImageSerializers(GoodsImage.objects.filter(goods_id=g['id'],is_delete=0),many=True)

        # # 获取所有产品
        # data_list = []
        #
        # goods_image = GoodsImageSerializers(GoodsImage.objects.filter(goods_id=g['id'],is_delete=0),many=True)
        # commodity = CommoditySerializers(Commodity.objects.filter(goods_id=g['id'],is_delete=0),many=True)
        # sort = Sort.objects.filter(id=g['sort_id'],is_delete=0).values()
        # classify = Classify.objects.filter(id=g['classify_id'],is_delete=0).values()
        # data_list.append([{'goods':g,'goods_image':goods_image.data,'commodity':commodity.data,'sort':sort,'classify':classify}])
        #
        # data = {'data':data_list}
        return Response(choose_element)



class CommodityListView(APIView):
    '''
    获取商品列表
    '''

    def get(self, request):
        commodity = Commodity.objects.all()
        cs = CommoditySerializers(commodity, many=True)
        data = {'data': cs.data}
        return Response(data)
























