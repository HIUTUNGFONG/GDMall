from django.db import models

from common.base_model import BaseModel


class IndexCarousel(BaseModel):
    '''首页轮播展示模型类'''
    image = models.ImageField(upload_to='banner', verbose_name='轮播图片')
    index = models.SmallIntegerField(default=0, verbose_name='展示顺序') # 0 1 2 3
    url = models.CharField(max_length=256, verbose_name='跳转地址')

    class Meta:
        db_table = 'gd_index_banner'
        verbose_name = '首页轮播图'
        verbose_name_plural = verbose_name
