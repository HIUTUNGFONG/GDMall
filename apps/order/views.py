import json

from django.db import transaction
from django.shortcuts import render


# 生成订单逻辑（传入token、商品id列表、商品数量列表、收货地址id）
# 判断是否有库存
# 创建订单号
# 将商品列表存入订单清单表（订单号、商品id、商品名称、商品规格、商品金额、商品数量、商品小图）
# 扣除库存
# 将购物车对应的商品删除
# 订单表存入订单信息（订单号、商品总价、订单总价、订单总件数、支付状态、运费、快递单号）
from django_redis import get_redis_connection
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.goods.models import Commodity, Goods
from apps.order.models import OrderInfo, OrderList
from apps.user.models import Address
from common.public_function import PublicFunction


class CreateOrderView(APIView):
    '''
    创建订单
    '''

    @transaction.atomic
    def post(self,request):
        # 接收数据
        data = json.loads(request.body)
        commodityId_list = data['commodityId_list']
        address_id = data['address_id']
        token = data['token']
        open_id = PublicFunction.getOpenIdByToken(token)

        if open_id == None:
            return Response({'errmsg':'openId不存在'})

        # 参数校验
        if not all([commodityId_list, address_id,token]):
            return Response({'errmsg': '数据不完整'})

        #  校验地址信息
        try:
            addr = Address.objects.get(id=address_id)
        except Address.DoesNotExist:
            # 地址不存在
            return Response({'errmsg': '地址信息错误'})

        # 业务逻辑
        # 生成订单号
        order_id = PublicFunction.orderNum()

        # 运费
        transit_price = 0

        # 总数目和总价格
        total_count = 0
        total_price = 0

        # 设置事务保存点
        sid = transaction.savepoint()

        try:
            # 向gd_order_info表中添加一条记录
            order = OrderInfo.objects.create(order_id=order_id,
                                             open_id=open_id,
                                             address_id=address_id,
                                             total_count=total_count,
                                             total_price=total_price,
                                             transit_price=transit_price)

            # 遍历向gd_order_list中添加记录
            for commodity_id in commodityId_list:
                # 获取商品的信息(行锁查询)
                try:
                    commodity = Commodity.objects.select_for_update().get(id=commodity_id)
                except Commodity.DoesNotExist:
                    # 商品不存在，回滚到sid事务保存点
                    transaction.savepoint_rollback(sid)
                    return Response({'errmsg': '商品不存在'})

                # 获取用户要购买商品的数量
                conn = get_redis_connection('Cart')
                count = conn.hget(open_id, commodity_id)

                # 判断商品的库存
                if int(count) > commodity.stock:
                    # 商品库存不足，回滚到sid事务保存点
                    transaction.savepoint_rollback(sid)
                    return Response({'errmsg': '商品库存不足'})

                # 向gd_order_list中添加一条记录
                OrderList.objects.create(order_id=order_id,
                                          commodity_id=commodity.id,
                                         commodity_specifications=commodity.code + commodity.color,
                                         commodity_price=commodity.price,
                                         commodity_count = count,
                                         commodity_image = commodity.image)

                # 减少商品的库存，增加销量
                commodity.stock -= int(count)
                commodity.sales += int(count)
                commodity.save()

                # 加计算用户要购买的商品的总数目和总价格
                total_count += int(count)
                total_price += commodity.price*int(count)

            # 更新order对应记录中的total_count和total_price
            order.total_count = total_count
            order.total_price = total_price
            order.save()
        except Exception as e:
            # 数据库操作出错，回滚到sid事务保存点
            transaction.savepoint_rollback(sid)
            return Response({'errmsg': '下单失败'})

        # 删除购物车中对应的记录 sku_ids=[1,2]
        conn.hdel(open_id, *commodityId_list)

        # 返回应答
        return Response({'message': '订单创建成功'})