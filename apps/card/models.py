from django.db import models

from apps.user.models import WxUser
from common.base_model import BaseModel


class Card(BaseModel):
    '''
    优惠券
    '''
    title = models.CharField(max_length=255, verbose_name='优惠券标题')
    describe = models.CharField(max_length=255, verbose_name='优惠券描述')
    discount_price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='优惠金额')
    min_price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='使用金额要求')
    card_count = models.IntegerField(verbose_name='优惠券数量')
    get_count = models.IntegerField(default=1,verbose_name='用户领取数量')
    validity = models.DateField(verbose_name='有效期')


    class Meta:
        db_table = 'gd_card'
        verbose_name = '优惠券'
        verbose_name_plural = verbose_name

    def __str__(self):
        return str(self.title)


class UserCard(BaseModel):
    '''
    用户优惠券
    '''

    card = models.ForeignKey(Card, on_delete=models.CASCADE, verbose_name='所属优惠券id')
    wx_user = models.ForeignKey(WxUser, on_delete=models.CASCADE, verbose_name='微信用户')
    is_use = models.BooleanField(default=False,verbose_name='是否使用')
    card_token = models.CharField(max_length=255,verbose_name='优惠券token')



    class Meta:
        db_table = 'gd_user_card'
        verbose_name = '用户优惠券'
        verbose_name_plural = verbose_name

    def __str__(self):
        return str(self.title)