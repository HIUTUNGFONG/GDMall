from apps.card.models import *
import xadmin

class CardAdmin(object):
    pass



xadmin.site.register(Card, CardAdmin)
