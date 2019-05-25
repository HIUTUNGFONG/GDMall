import json

from django_redis import get_redis_connection
from rest_framework.views import APIView
from rest_framework.response import Response

from apps.goods.models import Commodity
from apps.user.models import WxUser

'''
添加商品到购物车
'''
# 传入用户token、商品id、商品数量
# 查询redis对应的id是否存在该商品
# 存在：获取redis商品的数量，数量相加再加入redis
# 不存在：直接加入购物车

class CartAddView(APIView):
    '''购物车记录添加'''

    def post(self, request):
        '''购物车记录添加'''

        # 接收数据
        data = json.loads(request.body)
        commodity_id = data['commodity_id']
        count = data['commodity_count']
        token = data['token']
        # commodity_id = request.POST.get('commodity_id')
        # count = request.POST.get('commodity_count')
        # token = request.POST.get('token')

        # 数据校验
        if not all([commodity_id, count,token]):
            return Response({'errmsg': '数据不完整'})

        # 校验添加的商品数量
        try:
            count = int(count)
        except Exception as e:
            return Response({'errmsg': '商品数目出错'})

        # 校验商品是否存在
        try:
            commodity = Commodity.objects.get(id=commodity_id)
        except commodity.DoesNotExist:
            return Response({'errmsg': '商品不存在'})

        # 业务处理：添加购物车记录

        conn_ut = get_redis_connection('UserToken')
        result = conn_ut.get(token)
        openid = result.split('$$$$')[0]
        user = WxUser.objects.filter(openid=openid)
        user_id = user.id
        conn = get_redis_connection('Cart')
        cart_key = 'cart_%d' % user_id
        # 先尝试获取commodity_id的值 hget cart_key 属性
        # 如果commodity_id在hash中不存在，hget返回None
        cart_count = conn.hget(cart_key, commodity_id)
        if cart_count:
            # 累加购物车中的商品数目
            count += int(cart_count)
        # 校验商品库存
        if count > commodity.stock:
            return Response({'errmsg': '商品库存不足'})

        # 设置hash中sku_id对应的值
        conn.hset(cart_key, commodity_id, count)

        # 计算用户购物车商品的条目数
        total_count = conn.hlen(cart_key)

        # 返回应答
        return Response({'message': '添加成功', 'total_count': total_count})




'''
删除购物车商品
'''


'''
修改购物车商品数量
'''
