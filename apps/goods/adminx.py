from apps.goods.models import *
import xadmin

class IndexCarouselAdmin(object):
    pass


xadmin.site.register(IndexCarousel, IndexCarouselAdmin)
