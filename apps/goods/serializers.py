from .models import *

# 序列化器, 将数据包装成类似字典的格式
from rest_framework import serializers


# 创建一个IndexCarousel的序列化器


class IndexCarouselSerializers(serializers.ModelSerializer):
    '''
    首页轮播图
    '''
    class Meta:
        model = IndexCarousel   # 序列化的对象
        fields = '__all__'   # 序列化的属性

class IndexVideoOrBannerlSerializers(serializers.ModelSerializer):
    '''
    首页视频或图片
    '''
    class Meta:
        model = IndexVideoOrBanner   # 序列化的对象
        fields = '__all__'   # 序列化的属性

class SortSerializers(serializers.ModelSerializer):
    '''
    类别
    '''
    class Meta:
        model = Sort   # 序列化的对象
        fields = 'id','name'   # 序列化的属性
class ClassifySerializers(serializers.ModelSerializer):
    '''
    分类
    '''
    class Meta:
        model = Classify   # 序列化的对象
        fields = 'id','name'   # 序列化的属性

class GoodsSerializers(serializers.ModelSerializer):
    '''
    产品
    '''
    class Meta:
        model = Goods  # 序列化的对象
        # fields = '__all__'   # 序列化的属性
        fields = 'id', 'create_time', 'update_time', 'is_delete', 'title','sales', 'putaway', 'hits','featured'

class GoodsImageSerializers(serializers.ModelSerializer):
    '''
    产品图片
    '''
    class Meta:
        model = GoodsImage   # 序列化的对象
        fields = '__all__'   # 序列化的属性




class CommoditySerializers(serializers.ModelSerializer):
    '''
    商品
    '''
    class Meta:
        model = Commodity   # 序列化的对象
        fields = '__all__'   # 序列化的属性



