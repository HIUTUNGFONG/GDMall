from django.db import models

from common.base_model import BaseModel
from mdeditor.fields import MDTextField   # 必须导入


class IndexCarousel(BaseModel):
    '''
    首页轮播展示模型类
    '''
    image = models.ImageField(upload_to='Banner', blank=True, verbose_name='轮播图片')
    index = models.SmallIntegerField(default=0, verbose_name='展示顺序')  # 1 2 3
    url = models.CharField(max_length=256, verbose_name='跳转地址')

    class Meta:
        db_table = 'gd_index_banner'
        verbose_name = '首页轮播图'
        verbose_name_plural = verbose_name

    def __str__(self):
        return str(self.id)


class IndexVideoOrBanner(BaseModel):
    '''
    首页视频图片展示模型类
    '''

    status_choices = (
        (0, '图片'),
        (1, '视频'),
    )

    image = models.ImageField(upload_to='Banner', blank=True, verbose_name='图片')
    video = models.FileField(upload_to='Video', blank=True, verbose_name='视频')
    show_type = models.SmallIntegerField(default=0, choices=status_choices, verbose_name='展示类型')  # 1 2 3
    url = models.CharField(max_length=256, blank=True, verbose_name='跳转地址')

    class Meta:
        db_table = 'gd_index_video_or_banner'
        verbose_name = '首页视频或图片栏'
        verbose_name_plural = verbose_name

    def __str__(self):
        return str(self.id)


class Sort(BaseModel):
    '''
    类别模型类：男装、女装。。。
    '''
    name = models.CharField(max_length=30, verbose_name='类别名称')

    class Meta:
        db_table = 'gd_sort'
        verbose_name = '类别'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name


class Classify(BaseModel):
    '''
    分类模型类：衣服、裤子。。。
    '''
    name = models.CharField(max_length=30, verbose_name='分类名称')

    class Meta:
        db_table = 'gd_classify'
        verbose_name = '分类'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name


class Goods(BaseModel):
    '''
    产品模型类
    '''
    title = models.CharField(max_length=60, verbose_name='产品标题')
    sales = models.IntegerField(default=0, verbose_name='销量')
    sort = models.ForeignKey(Sort, on_delete=models.CASCADE, verbose_name='所属类别id')
    classify = models.ForeignKey(Classify, on_delete=models.CASCADE, verbose_name='所属分类id')
    hits = models.IntegerField(default=0, verbose_name='点击量')
    featured = models.BooleanField(default=False, verbose_name='是否主推')
    putaway = models.BooleanField(default=False, verbose_name='是否上架')

    class Meta:
        db_table = 'gd_goods'
        verbose_name = '产品'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.title


class GoodsImage(BaseModel):
    '''
    产品图片模型类
    '''
    status_choices = (
        (0, '产品大图'),
        (1, '产品图文'),
    )

    goods = models.ForeignKey(Goods, on_delete=models.CASCADE, verbose_name='所属产品id')
    show_region = models.SmallIntegerField(choices=status_choices, verbose_name='展示区域')
    image = models.ImageField(upload_to='GoodsImg', blank=True, verbose_name='图片')
    content = MDTextField(verbose_name='内容')
    index = models.SmallIntegerField(default=0, verbose_name='展示顺序')

    class Meta:
        db_table = 'gd_goods_image'
        verbose_name = '产品图片'
        verbose_name_plural = verbose_name

    def __str__(self):
        return str(self.goods.title)


class Attribute(BaseModel):
    '''
    产品属性模型类
    '''

    goods = models.ForeignKey(Goods, on_delete=models.CASCADE, verbose_name='所属产品id')
    brand = models.CharField(max_length=255, blank=True, verbose_name='品牌')
    color = models.CharField(max_length=255, blank=True, verbose_name='颜色')
    code = models.CharField(max_length=255, blank=True, verbose_name='尺码')
    art_no = models.CharField(max_length=255, blank=True, verbose_name='货号')
    pattern = models.CharField(max_length=255, blank=True, verbose_name='版型')
    collar = models.CharField(max_length=255, blank=True, verbose_name='领型')
    season = models.CharField(max_length=255, blank=True, verbose_name='季节')
    ttm = models.CharField(max_length=255, blank=True, verbose_name='上市时间')

    class Meta:
        db_table = 'gd_attribute'
        verbose_name = '产品属性'
        verbose_name_plural = verbose_name

    def __str__(self):
        return str(self.goods.title)


class Commodity(BaseModel):
    '''
    商品模型类
    '''
    name = models.CharField(default='商品未命名',max_length=255,verbose_name='商品名称')
    goods = models.ForeignKey(Goods, on_delete=models.CASCADE, verbose_name='所属产品id')
    color = models.CharField(max_length=10, verbose_name='颜色')
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='单价')
    code = models.CharField(max_length=10, verbose_name='尺码')
    image = models.ImageField(upload_to='CommdityImg', verbose_name='商品小图')
    stock = models.IntegerField(default=0, verbose_name='库存')
    sales = models.IntegerField(default=0, verbose_name='商品销量')
    selected = models.BooleanField(default=False,verbose_name='是否选中')

    class Meta:
        db_table = 'gd_commodity'
        verbose_name = '商品'
        verbose_name_plural = verbose_name

    def __str__(self):
        return str(self.goods.title)

class CommodityBanner(BaseModel):
    '''
    商品详情轮播图
    '''
    goods = models.ForeignKey(Goods, on_delete=models.CASCADE, verbose_name='所属产品')
    image = models.ImageField(upload_to='CommdityBannerImg', verbose_name='商品图片')
    index = models.IntegerField(default=0, verbose_name='展示顺序')


    class Meta:
        db_table = 'gd_commodity_Banner'
        verbose_name = '商品轮播图'
        verbose_name_plural = verbose_name

    def __str__(self):
        return str(self.goods)

class UserBackground(BaseModel):
    '''
    用户页面背景图
    '''
    image = models.ImageField(upload_to='UserBackgroundImg', blank=True, verbose_name='背景图片')


    class Meta:
        db_table = 'gd_user_background'
        verbose_name = '用户页面背景图'
        verbose_name_plural = verbose_name


    def __str__(self):
        return str(self.image)