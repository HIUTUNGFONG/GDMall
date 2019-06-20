from django.db import models

from apps.goods.models import Commodity
from apps.user.models import Address, WxUser
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
        (4, '已完成'),
        (5, '待退款'),
        (6, '已关闭')
    )
    wx_user = models.ForeignKey(WxUser,on_delete=models.CASCADE, verbose_name='微信用户')
    address = models.CharField(max_length=255,null=True, verbose_name='收件地址')
    name = models.CharField(max_length=30, null=True,verbose_name='收件人姓名')
    phone = models.CharField(max_length=11, null=True,verbose_name='收件人手机')
    order_id = models.CharField(max_length=255, verbose_name='订单号')
    commodity_total_price = models.FloatField(verbose_name='商品总价')
    total_price = models.FloatField(verbose_name='订单总价')
    total_count = models.IntegerField(verbose_name='订单总件数')
    transit_price = models.FloatField(default=0, verbose_name='运费')
    state = models.SmallIntegerField(default=0, choices=status_choices, verbose_name='订单状态')
    courier_number = models.CharField(max_length=255,default='', verbose_name='快递单号')
    returns_number = models.CharField(max_length=255,default='', verbose_name='退货单号')
    note = models.CharField(max_length=255,default='', verbose_name='备注')
    cancel_time = models.CharField(max_length=30,null=True, verbose_name='取消时间')
    complete_time = models.CharField(max_length=30,null=True, verbose_name='完成时间')

    class Meta:
        db_table = 'gd_order_info'
        verbose_name = '订单表'
        verbose_name_plural = verbose_name

    def __str__(self):
        return str(self.id)


class OrderList(BaseModel):
    '''
    订单清单表
    '''
    wx_user = models.ForeignKey(WxUser,on_delete=models.CASCADE, verbose_name='微信用户')
    order_info = models.ForeignKey(OrderInfo, on_delete=models.CASCADE, verbose_name='订单号')
    commodity = models.ForeignKey(Commodity, on_delete=models.CASCADE, verbose_name='所属商品')
    commodity_name = models.CharField(max_length=255,verbose_name='商品名称')
    commodity_specifications = models.CharField(max_length=255,verbose_name='商品规格')
    commodity_price = models.FloatField(verbose_name='商品单价')
    commodity_count = models.IntegerField(verbose_name='商品数量')
    commodity_image = models.CharField(max_length=255,verbose_name='商品图片')

    class Meta:
        db_table = 'gd_order_list'
        verbose_name = '订单清单表'
        verbose_name_plural = verbose_name

    def __str__(self):
        return str(self.id)


class WxOrder(BaseModel):
    '''
    微信支付订单信息
    '''
    wx_user = models.ForeignKey(WxUser, on_delete=models.CASCADE, verbose_name='微信用户')
    order_info = models.ForeignKey(OrderInfo, on_delete=models.CASCADE, verbose_name='订单号')
    wx_order = models.CharField(max_length=255,verbose_name='微信支付订单号')
    pay_time = models.CharField(max_length=30, null=True, verbose_name='支付完成时间')


    class Meta:
        db_table = 'gd_wx_order'
        verbose_name = '微信支付订单'
        verbose_name_plural = verbose_name

    def __str__(self):
        return str(self.id)


