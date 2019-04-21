from apps.goods.models import *
import xadmin

class IndexCarouselAdmin(object):
    pass
class IndexVideoOrBannerAdmin(object):
    pass


xadmin.site.register(IndexCarousel, IndexCarouselAdmin)
xadmin.site.register(IndexVideoOrBanner, IndexVideoOrBannerAdmin)
