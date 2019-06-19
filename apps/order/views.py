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
from apps.user.models import Address, WxUser
from common.public_function import PublicFunction


class CreateOrderView(APIView):
    '''
    创建订单
    '''

    @transaction.atomic
    def post(self, request):
        # 接收数据
        data = json.loads(request.body)
        commodityId_list = data['commodityId_list']
        address_id = data['address_id']
        note = data['note']
        token = data['token']
        open_id = PublicFunction().getOpenIdByToken(token)

        # 参数校验
        if not all([commodityId_list, address_id, token]):
            return Response({'msg': '数据不完整'})
        # 校验用户
        if open_id:
            try:
                wx_user = WxUser.objects.get(open_id=open_id)
            except:
                return Response({'msg': '用户不存在'})

        #  校验地址信息
        try:
            address = Address.objects.get(id=address_id)
        except Address.DoesNotExist:
            # 地址不存在
            return Response({'msg': '地址信息错误'})

        # 业务逻辑
        # 生成订单号
        order_id = PublicFunction().orderNum()

        # 运费
        transit_price = 0

        # 总数目和总价格
        total_count = 0
        total_price = 0

        # 设置事务保存点
        sid = transaction.savepoint()

        try:
            # 向gd_order_info表中添加一条记录
            order = OrderInfo.objects.create(wx_user=wx_user,
                                             address=address.address,
                                             name=address.name,
                                             phone=address.phone,
                                             order_id=order_id,
                                             commodity_total_price=total_price,
                                             total_price=total_price,
                                             total_count=total_count,
                                             transit_price=transit_price,
                                             note=note)

            # 遍历向gd_order_list中添加记录
            for commodity_id in commodityId_list:
                # 获取商品的信息(行锁查询)
                try:
                    commodity = Commodity.objects.select_for_update().get(id=commodity_id)
                except Commodity.DoesNotExist:
                    # 商品不存在，回滚到sid事务保存点
                    transaction.savepoint_rollback(sid)
                    return Response({'msg': '商品不存在'})

                # 获取用户要购买商品的数量
                conn = get_redis_connection('Cart')
                cart_key = 'cart_' + open_id
                count = conn.hget(cart_key, commodity_id)
                print(count)
                print(commodity.stock)

                # 判断商品的库存
                if int(count) > commodity.stock:
                    # 商品库存不足，回滚到sid事务保存点
                    transaction.savepoint_rollback(sid)
                    return Response({'msg': '商品库存不足'})

                # 向gd_order_list中添加一条记录

                OrderList.objects.create(order_info=order,
                                         wx_user=wx_user,
                                         commodity=commodity,
                                         commodity_name=commodity.name,
                                         commodity_specifications=commodity.code + ' ' + commodity.color,
                                         commodity_price=commodity.price,
                                         commodity_count=int(count),
                                         commodity_image=commodity.image)

                # 减少商品的库存，增加销量
                commodity.stock -= int(count)
                commodity.sales += int(count)
                commodity.save()

                # 加计算用户要购买的商品的总数目和总价格
                total_count += int(count)
                total_price += commodity.price * int(count)

            # 更新order对应记录中的total_count和total_price
            order.total_count = total_count
            order.total_price = total_price + transit_price
            order.commodity_total_price = total_price
            order.save()
        except Exception as e:
            # 数据库操作出错，回滚到sid事务保存点
            print(e)
            transaction.savepoint_rollback(sid)
            return Response({'msg': '下单失败'})

        # 删除购物车中对应的记录 sku_ids=[1,2]
        conn.hdel(cart_key, *commodityId_list)

        # 返回应答
        return Response({'msg': '订单创建成功', 'order_id': order_id})


class OrderView(APIView):
    '''
    获取订单信息
    '''

    def get(self, request, token):

        # 参数校验
        if not all([token]):
            return Response({'msg': '数据不完整'})

        # 获取用户open_id
        open_id = PublicFunction().getOpenIdByToken(token)

        data_list = []
        # 校验用户
        if open_id:
            try:
                wx_user = WxUser.objects.get(open_id=open_id)
            except:
                return Response({'msg': '用户不存在'})
            try:
                '''
                {
                    order_list{
                        ...
                        order_info:{
                            ...
                            
                        }
                        商品清单列表{
                                [商品，商品]
                        }
                    }
                }
                '''
                order_info = OrderInfo.objects.filter(wx_user=wx_user, is_delete=False).order_by('-create_time')

                for order in order_info:
                    orders = OrderList.objects.filter(order_info=order).values()
                    data = {
                        'create_time': str(order.create_time)[0:19],
                        'state': order.state,
                        'total_count': order.total_count,
                        'total_price': order.total_price,
                        'order_list': orders,
                    }
                    data_list.append(data)
            except:
                return Response({'msg': '无订单信息'})

        return Response(data_list)

    '''
    获取订单清单信息
    '''

    def post(self, request):
        # 接收数据
        data = json.loads(request.body)
        order_id = data['order_id']
        token = data['token']

        # 参数校验
        if not all([order_id, token]):
            return Response({'msg': '数据不完整'})

        # 获取用户open_id
        open_id = PublicFunction().getOpenIdByToken(token)

        data = {}

        # 校验用户
        if open_id:
            try:
                wx_user = WxUser.objects.get(open_id=open_id)
            except:
                return Response({'msg': '用户不存在'})
            try:
                order_info = OrderInfo.objects.get(order_id=order_id)
            except:
                return Response({'msg': '订单不存在'})
            try:
                order_list = OrderList.objects.filter(wx_user=wx_user, order_info=order_info, is_delete=False).values()
                data['order_list'] = order_list
            except:
                return Response({'msg': '获取订单清单失败'})
        return Response(data)


class OrderByOrderIdView(APIView):
    '''
    获取订单信息---根据order_info_id
    '''

    def post(self, request):
        # 接收数据
        data = json.loads(request.body)
        order_info_id = data['order_info_id']
        token = data['token']

        # 参数校验
        if not all([token, order_info_id]):
            return Response({'msg': '数据不完整'})

        # 获取用户open_id
        open_id = PublicFunction().getOpenIdByToken(token)

        data = {}
        # 校验用户
        if open_id:
            try:
                wx_user = WxUser.objects.get(open_id=open_id)
            except:
                return Response({'msg': '用户不存在'})
            try:
                '''
                {
                    order_list{
                        ...
                        order_info:{
                            ...

                        }
                        商品清单列表{
                                [商品，商品]
                        }
                    }
                }
                '''
                order_info = OrderInfo.objects.get(wx_user=wx_user, is_delete=False, id=order_info_id)

                orders = OrderList.objects.filter(order_info=order_info).values()

                data = {
                    'order_id': order_info.order_id,
                    'name': order_info.name,
                    'phone': order_info.phone,
                    'note': order_info.note,
                    'create_time': str(order_info.create_time)[0:19],
                    'cancel_time': order_info.cancel_time,
                    'state': order_info.status_choices[order_info.state],
                    'total_count': order_info.total_count,
                    'commodity_total_price': order_info.commodity_total_price,
                    'total_price': order_info.total_price,
                    'transit_price': order_info.transit_price,
                    'order_list': orders,
                }
            except:
                return Response({'msg': '无订单信息'})

        return Response(data)


class DeleteOrderView(APIView):
    '''
    删除订单
    '''

    def post(self, request):
        # 接收数据
        data = json.loads(request.body)
        order_id = data['order_id']
        token = data['token']

        # 参数校验
        if not all([order_id, token]):
            return Response({'msg': '数据不完整'})

        # 获取用户open_id
        open_id = PublicFunction().getOpenIdByToken(token)

        # 校验用户
        if open_id:
            try:
                wx_user = WxUser.objects.get(open_id=open_id)
            except:
                return Response({'msg': '用户不存在'})
            try:
                order_info = OrderInfo.objects.get(order_id=order_id)
                order_info.is_delete = True
                order_info.save()
            except:
                return Response({'msg': '订单不存在'})
        return Response({'msg': '删除订单成功'})


class CleanInvalidOrderView(APIView):
    '''
    清理无效的订单
    '''

    def post(self, request):
        # 接收数据
        data = json.loads(request.body)
        token = data['token']

        # 参数校验
        if not all([token]):
            return Response({'msg': '数据不完整'})

        # 获取用户open_id
        open_id = PublicFunction().getOpenIdByToken(token)
        # 校验用户
        if open_id:
            try:
                wx_user = WxUser.objects.get(open_id=open_id)
            except:
                return Response({'msg': '用户不存在'})
            try:
                # 查询未支付状态的订单
                order_info = OrderInfo.objects.filter(wx_user=wx_user, state=0, is_delete=False)
                if order_info:
                    for order in order_info:
                        # 判断是否超时
                        if PublicFunction.timeout(order.create_time):
                            order.state = 6
                            order.save()

            except:
                return Response({'msg': '无订单信息'})
