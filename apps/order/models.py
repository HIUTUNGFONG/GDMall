from django.db import models

from apps.goods.models import Commodity
from apps.user.models import Address
from common.base_model import BaseModel


class OrderInfo(BaseModel):
    '''
    订单表
    '''

    status_choices = (
        (0, '未支付'),
        (1, '已支付'),
        (2, '待发货'),
        (3, '已发货'),
        (4, '待收货'),
        (5, '退款'),
        (6, '已关闭')
    )
    open_id = models.CharField(max_length=255, verbose_name='微信用户id')
    address_id = models.ForeignKey(Address, on_delete=models.CASCADE, verbose_name='用户地址id')
    order_id = models.CharField(max_length=255, verbose_name='订单号')
    commodity_total_price = models.FloatField(verbose_name='商品总价')
    order_total_price = models.FloatField(verbose_name='订单总价')
    order_count = models.IntegerField(verbose_name='订单总件数')
    transit_price = models.FloatField(default=0, verbose_name='运费')
    state = models.SmallIntegerField(default=0, choices=status_choices, verbose_name='订单状态')
    courier_number = models.IntegerField(null=True, verbose_name='快递单号')
    cancel_time = models.CharField(max_length=255,null=True, verbose_name='取消时间')
    complete_time = models.CharField(max_length=255,null=True, verbose_name='完成时间')

    class Meta:
        db_table = 'gd_order_info'
        verbose_name = '订单表'
        verbose_name_plural = verbose_name

    def __str__(self):
        return str(self.order_id)


class OrderList():
    '''
    订单清单表
    '''
    open_id = models.CharField(max_length=255, verbose_name='微信用户id')
    order_id = models.ForeignKey(OrderInfo, on_delete=models.CASCADE, verbose_name='订单号')
    commodity_id = models.ForeignKey(Commodity, on_delete=models.CASCADE, verbose_name='商品id')
    commodity_name = models.CharField(verbose_name='商品名称')
    commodity_specifications = models.CharField(verbose_name='商品规格')
    commodity_price = models.FloatField(verbose_name='商品单价')
    commodity_count = models.IntegerField(verbose_name='商品数量')
    commodity_image = models.URLField(verbose_name='商品图片')

    class Meta:
        db_table = 'gd_order_list'
        verbose_name = '订单清单表'
        verbose_name_plural = verbose_name

    def __str__(self):
        return str(self.order_id)
