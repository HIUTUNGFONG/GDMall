from .models import *

# 序列化器, 将数据包装成类似字典的格式
from rest_framework import serializers


# 创建一个IndexCarousel的序列化器


class IndexCarouselSerializers(serializers.ModelSerializer):
    class Meta:
        model = IndexCarousel   # 序列化的对象
        fields = '__all__'   # 序列化的属性

class IndexVideoOrBannerlSerializers(serializers.ModelSerializer):
    class Meta:
        model = IndexVideoOrBanner   # 序列化的对象
        fields = '__all__'   # 序列化的属性

