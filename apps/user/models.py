# from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import AbstractUser
from django.db import models

from common.base_model import BaseModel


class User(BaseModel, AbstractUser):
    '''
    用户信息模型
    '''
    birthday = models.CharField(max_length=50, blank=True, verbose_name='出生日期')
    height = models.CharField(max_length=30,default=0, blank=True, verbose_name='身高')
    weight = models.CharField(max_length=30,default=0, blank=True, verbose_name='体重')
    phone = models.CharField(max_length=11, default=0, verbose_name='手机号码')

    class Meta:
        db_table = 'gd_user'
        verbose_name = '员工信息'
        verbose_name_plural = verbose_name


class WxUser(BaseModel):
    '''
    用户信息模型
    '''
    openid = models.CharField(max_length=50, verbose_name='用户openid')
    nick_name = models.CharField(max_length=50, blank=True, verbose_name='昵称')
    head_portrait = models.CharField(max_length=255, blank=True, verbose_name='用户头像')
    birthday = models.CharField(max_length=50, blank=True, verbose_name='出生日期')
    height = models.CharField(max_length=30,default=0, blank=True, verbose_name='身高')
    weight = models.CharField(max_length=30,default=0, blank=True, verbose_name='体重')
    phone = models.CharField(max_length=11, default=0, verbose_name='手机号码')
    integral = models.IntegerField(default=0, verbose_name='会员积分')
    is_active = models.BooleanField(default=1,verbose_name='是否激活')

    class Meta:
        db_table = 'gd_wx_user'
        verbose_name = '用户信息'
        verbose_name_plural = verbose_name


class Address(BaseModel):
    '''
    用户收货地址
    '''
    openid = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='用户openid')
    addressee = models.CharField(max_length=30, verbose_name='收件人')
    phone = models.CharField(max_length=11, null=True, verbose_name='联系人电话')
    shipping_address = models.CharField(max_length=255, verbose_name='收件地址')
    is_default = models.BooleanField(default=0, verbose_name='是否默认')

    class Meta:
        db_table = 'gd_address'
        verbose_name = '收货地址信息'
        verbose_name_plural = verbose_name


class VipLevel(BaseModel):
    '''
    会员等级
    '''
    level = models.CharField(max_length=20, verbose_name='等级名称')
    minmum_integral = models.IntegerField(verbose_name='积分要求值')

    class Meta:
        db_table = 'gd_vip_level'
        verbose_name = '会员等级'
        verbose_name_plural = verbose_name
