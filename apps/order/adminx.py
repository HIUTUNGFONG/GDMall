from apps.order.models import *
import xadmin

class OrderInfoAdmin(object):
    pass
class OrderListAdmin(object):
    pass
class WxOrderAdmin(object):
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


xadmin.site.register(OrderInfo, OrderInfoAdmin)
xadmin.site.register(OrderList, OrderListAdmin)
xadmin.site.register(WxOrder, WxOrderAdmin)


