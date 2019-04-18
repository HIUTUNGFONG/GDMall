from django.contrib.auth.base_user import AbstractBaseUser

from common.base_model import BaseModel
from django.db import models

# class User(BaseModel):
#
#     openid = models.CharField(max_length='50', verbose_name='微信openid')
#     nick_name = models.CharField(max_length='50', verbose_name='昵称')
#     is_active = models.BooleanField(default=True, verbose_name='是否启用')

#     class Meta:
#         verbose_name = '用户'
#         verbose_name_plural = '用户'

