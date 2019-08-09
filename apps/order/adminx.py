from apps.order.models import *
import xadmin

class OrderInfoAdmin(object):
    list_display = ['id', 'create_time', 'order_id','name','phone','address','commodity_total_price','state','complete_time','note']
class OrderListAdmin(object):
    list_display = ['id','create_time','commodity','commodity_specifications','commodity_count']
class WxOrderAdmin(object):
    list_display = ['id','create_time','wx_order','pay_time']



xadmin.site.register(OrderInfo, OrderInfoAdmin)
xadmin.site.register(OrderList, OrderListAdmin)
xadmin.site.register(WxOrder, WxOrderAdmin)


