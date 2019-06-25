import json

from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.card.models import Card, UserCard
from apps.user.models import WxUser
from common.public_function import PublicFunction


class CardView(APIView):
    '''
    获取优惠券列表
    '''

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

        return Response({'card_list': card})



class UserCardView(APIView):

    def get(self,request,token):
        # 参数校验
        if not all([token]):
            return Response({'msg': '数据不完整'})

        # 获取用户open_id
        open_id = PublicFunction().getOpenIdByToken(token)
        data_list = []

        # 校验用户
        if open_id:
            try:
                wx_user = WxUser.objects.get(open_id=open_id)
            except:
                return Response({'msg': '用户不存在'})
            try:
                user_card_list = UserCard.objects.filter(wx_user=wx_user)
                for user_card in user_card_list:
                    card = Card.objects.filter(id=user_card.card).values()
                    data_list.append(card)
            except:
                return Response({'msg': '暂无优惠券'})

        return Response({'card_list': data_list})


class AddCardView(APIView):
    '''
      领取优惠券
      '''

    def post(self, request):

        # 接收数据
        data = json.loads(request.body)
        card_id = data['card_id']
        token = data['token']

        # 参数校验
        if not all([card_id, token]):
            return Response({'msg': '数据不完整'})

        # 获取用户open_id
        open_id = PublicFunction().getOpenIdByToken(token)
        str32 = PublicFunction().randomStr()

        # 校验用户
        if open_id:
            try:
                wx_user = WxUser.objects.get(open_id=open_id)
            except:
                return Response({'msg': '用户不存在'})
            try:

                card = Card.objects.get(id=card_id)
                user_card = UserCard.objects.filter(wx_user=wx_user)
                print(user_card)
                if (user_card == ''):
                    print('t')
                    UserCard.objects.create(card_id=card_id, wx_user=wx_user, card_token=str32).save()
                else:
                    print('tt')
                    print(len(user_card))
                    print('领取数量' + card.get_count)
            except:
                return Response({'msg': '优惠券不存在'})
        return Response({'msg': '领取成功'})
