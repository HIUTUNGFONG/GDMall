from apps.card.models import *
import xadmin

class CardAdmin(object):
    pass
class UserCardAdmin(object):
    pass



xadmin.site.register(Card, CardAdmin)
xadmin.site.register(UserCard, UserCardAdmin)
