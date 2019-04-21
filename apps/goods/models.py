from django.db import models

from common.base_model import BaseModel


class IndexCarousel(BaseModel):
    '''首页轮播展示模型类'''
    image = models.ImageField(upload_to='banner', blank=True, verbose_name='轮播图片')
    index = models.SmallIntegerField(default=0, verbose_name='展示顺序') # 1 2 3
    url = models.CharField(max_length=256, verbose_name='跳转地址')

    class Meta:
        db_table = 'gd_index_banner'
        verbose_name = '首页轮播图'
        verbose_name_plural = verbose_name

class IndexVideoOrBanner(BaseModel):
    '''首页视频图片展示模型类'''

    status_choices = (
        (0, '图片'),
        (1, '视频'),
    )

    image = models.ImageField(upload_to='banner', blank=True, verbose_name='图片')
    video = models.FileField(upload_to='video', blank=True, verbose_name='视频')
    show_type = models.SmallIntegerField(default=0, choices=status_choices, verbose_name='展示类型') # 1 2 3
    url = models.CharField(max_length=256, blank=True, verbose_name='跳转地址')

    class Meta:
        db_table = 'gd_index_video_or_banner'
        verbose_name = '首页视频or图片'
        verbose_name_plural = verbose_name
