from django.shortcuts import render
from requests import Response
from rest_framework.views import APIView

from apps.card.models import Card
from apps.user.models import WxUser
from common.public_function import PublicFunction


class CardView(APIView):

    '''
    获取优惠券列表
    '''
    def get(self,request,token):

        def get(self, request, token):

            # 参数校验
            if not all([token]):
                return Response({'msg': '数据不完整'})

            # 获取用户open_id
            open_id = PublicFunction().getOpenIdByToken(token)

            # 校验用户
            if open_id:
                try:
                    wx_user = WxUser.objects.get(open_id=open_id)
                except:
                    return Response({'msg': '用户不存在'})
                try:
                    card = Card.objects.filter(is_delete=0).values()
                except:
                    return Response({'msg': '暂无优惠券活动'})

            return Response({'card_list':card})