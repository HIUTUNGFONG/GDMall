import json

from django.http import HttpResponse
from django.shortcuts import render
from django_redis import get_redis_connection
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.order.models import OrderInfo, WxOrder
from apps.user.models import WxUser
from common.public_function import *

pay_url = 'https://api.mch.weixin.qq.com/pay/unifiedorder'

wxinfo = {
    'APPID': 'wxc999b4ac2adc328e',
    'SECRET': '8b4f824b7d81a2a2b091eca8c9eeb2ba',
    'MCHID': '1535717001',
    'MCHKEY': 'guanxinguanxinguanxinguanxin3344'
}


class WxPayView(APIView):

    def post(self, request):
        # 接收数据
        data = json.loads(request.body)
        token = data['token']
        order_id = data['order_id']
        # 获取open_id
        open_id = PublicFunction().getOpenIdByToken(token)
        if open_id:
            try:
                wx_user = WxUser.objects.get(open_id=open_id)
            except:
                return Response({'msg': '用户不存在'})
            try:
                order_info = OrderInfo.objects.get(order_id=order_id)
                total_fee = str(int(order_info.total_price * 100))
                # 创建微信订单
                WxOrder.objects.create(wx_user=wx_user,order_info=order_info).save()
            except:
                return Response({'msg':'订单不存在'})


        str32 = PublicFunction().randomStr()
        orderNum = PublicFunction().orderNum()
        params = {
            'openid': open_id,
            'appid': wxinfo['APPID'],
            'mch_id': wxinfo['MCHID'],
            'nonce_str': str32,
            'body': 'test支付',
            'out_trade_no': orderNum,
            'total_fee': total_fee,
            'spbill_create_ip': '47.112.147.15',
            'notify_url': 'http://www.grotesquery.cn/api/pay/get',
            'trade_type': 'JSAPI'
        }
        sign = PublicFunction().wx_sign(params, wxinfo['MCHKEY'])
        params['sign'] = sign
        print(params)
        xmlmsg = PublicFunction().send_xml_request(pay_url, params)
        print(xmlmsg)
        print(xmlmsg['xml'])
        if xmlmsg['xml']['return_code'] == 'SUCCESS':
            prepay_id = xmlmsg['xml']['prepay_id']
            timeStamp = str(int(time.time()))
            pay_data = {
                'appId': wxinfo['APPID'],
                'nonceStr': str32,
                'package': 'prepay_id=' + prepay_id,
                'signType': 'MD5',
                'timeStamp': timeStamp
            }
            # 再次签名
            paySign = PublicFunction().wx_sign(pay_data, wxinfo['MCHKEY'])
            pay_data['paySign'] = paySign
        return Response(pay_data)


class PayView(APIView):
    '''
    获取微信返回的支付消息
    '''

    def post(self, request):
        xml = request.body.decode('utf-8')
        xmlmsg = xmltodict.parse(xml)
        return_code = xmlmsg['xml']['return_code']

        if return_code == 'FAIL':
            # 官方发出错误
            return HttpResponse(
                """<xml><return_code><![CDATA[FAIL]]></return_code><return_msg><![CDATA[Signature_Error]]></return_msg></xml>""",
                content_type='text/xml', status=200)
        elif return_code == 'SUCCESS':
            # 获取支付的订单号
            out_trade_no = xmlmsg['xml']['out_trade_no']
            # 获取订单金额
            cash_fee = xmlmsg['xml']['cash_fee']
            # 获取签名
            sign = xmlmsg['xml']['sign']
            # 获取支付完成时间
            time_end = xmlmsg['xml']['time_end']
            # 获取交易单号
            transaction_id = xmlmsg['xml']['transaction_id']
            # 获取自己的数据
            try:
                order_info = OrderInfo.objects.get(order_id=out_trade_no)
                # 订单金额
                total_price = str(int(order_info.total_price*100))
                # 订单签名
                mysign = PublicFunction.AuthSignByXml(xml)
                if sign != mysign and total_price != cash_fee:
                    return HttpResponse(
                        """<xml><return_code><![CDATA[FAIL]]></return_code><return_msg><![CDATA[签名错误]]></return_msg></xml>""",
                        content_type='text/xml', status=200)
            except:
                return HttpResponse(
                    """<xml><return_code><![CDATA[FAIL]]></return_code><return_msg><![CDATA[签名错误]]></return_msg></xml>""",
                    content_type='text/xml', status=200)
            # 比对成功，修改订单状态
            order_info.state = 1
            order_info.save()
            # 加入到微信订单表
            wx_order = WxOrder.objects.get(order_info=order_info)
            wx_order.wx_order=transaction_id
            wx_order.pay_time = time_end
            wx_order.save()

            return HttpResponse(
                """<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>""",
                content_type='text/xml', status=200)
