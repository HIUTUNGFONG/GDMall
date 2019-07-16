from apps.goods.models import *
import xadmin

class IndexCarouselAdmin(object):
    pass
class IndexVideoOrBannerAdmin(object):
    pass
class SortAdmin(object):
    pass
class ClassifyAdmin(object):
    pass
class GoodsAdmin(object):
    pass
class GoodsImageAdmin(object):
    pass
class AttributeAdmin(object):
    pass
class CommodityAdmin(object):
    pass
class CommodityBannerAdmin(object):
    pass


xadmin.site.register(IndexCarousel, IndexCarouselAdmin)
xadmin.site.register(IndexVideoOrBanner, IndexVideoOrBannerAdmin)
xadmin.site.register(Sort, SortAdmin)
xadmin.site.register(Classify, ClassifyAdmin)
xadmin.site.register(Goods, GoodsAdmin)
xadmin.site.register(GoodsImage, GoodsImageAdmin)
xadmin.site.register(Attribute, AttributeAdmin)
xadmin.site.register(Commodity, CommodityAdmin)
xadmin.site.register(CommodityBanner, CommodityBannerAdmin)
