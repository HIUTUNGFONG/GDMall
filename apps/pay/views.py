import json

from django.shortcuts import render
from django_redis import get_redis_connection
from rest_framework.response import Response
from rest_framework.views import APIView

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
        conn_ut = get_redis_connection('UserToken')
        result = conn_ut.get(token)
        result = str(result, encoding="utf8")
        openid = result.split('$$$$')[0]
        str32 = PublicFunction().randomStr()
        orderNum = PublicFunction().orderNum()
        params = {
            'openid': openid,
            'appid': wxinfo['APPID'],
            'mch_id': wxinfo['MCHID'],
            'nonce_str': str32,
            'body': 'test支付',
            'out_trade_no': orderNum,
            'total_fee': '1000',
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
                'package': 'prepay_id' + prepay_id,
                'signType': 'MD5',
                'timeStamp': timeStamp
            }
            # 再次签名
            paySign = PublicFunction().wx_sign(pay_data)
            pay_data['paySign'] = paySign
        return Response(pay_data)
