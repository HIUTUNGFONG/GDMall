from django.db import models

from common.base_model import BaseModel


class Card(BaseModel):
    '''
    优惠券
    '''
    card_id = models.CharField(max_length=255,verbose_name='优惠券id')
    title = models.CharField(max_length=255, verbose_name='优惠券标题')
    describe = models.CharField(max_length=255, verbose_name='优惠券描述')
    discount_price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='优惠金额')
    min_price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='使用金额要求')
    card_count = models.IntegerField(verbose_name='优惠券数量')
    get_count = models.IntegerField(default=1,verbose_name='用户领取数量')
    validity = models.DateTimeField(verbose_name='有效期')


    class Meta:
        db_table = 'gd_card'
        verbose_name = '优惠券'
        verbose_name_plural = verbose_name

    def __str__(self):
        return str(self.title)