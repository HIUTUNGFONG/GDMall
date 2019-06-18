import hashlib
import os
import random
import string
import time

import requests
import xmltodict as xmltodict
from django_redis import get_redis_connection


class PublicFunction(object):

    def randomStr(self):
        return ''.join(random.sample(string.ascii_letters + string.digits, 32))

    def orderNum(self):
        return time.strftime('%Y%m%d%H%M%S') + str(random.randint(100000, 999999))

    def wx_sign(self, params, mchkey):
        stringA = ''
        ks = sorted(params.keys())
        # 参数排序
        for k in ks:
            stringA += (k + '=' + params[k] + '&')

        # 拼接商户key
        stringSignTemp = stringA + 'key=' + mchkey

        # md5加密
        hash_md5 = hashlib.md5(stringSignTemp.encode('utf8'))
        sign = hash_md5.hexdigest().upper()
        return sign

    def send_xml_request(self, url, params):
        # 支付xml加密
        params = {'xml': params}
        xml = xmltodict.unparse(params)
        response = requests.post(url, data=xml.encode('UTF8'), headers={'Content-Type': 'charset=utf-8'})
        msg = response.text
        xmlmsg = xmltodict.parse(msg)
        return xmlmsg

    def getOpenIdByToken(self,token):
        # 根据token获取open_id
        conn_ut = get_redis_connection('UserToken')
        result = conn_ut.get(token)
        result = str(result, encoding="utf8")
        openid = result.split('$$$$')[0]
        return openid

    def createRedisToken(self,open_id,session_id):
        # 生成一个随机3rd_session
        session_key = os.popen('head -n 80 /dev/urandom | tr -dc A-Za-z0-9 | head -c 64').read()

        # 获取redis连接
        conn = get_redis_connection('UserToken')
        conn.set(session_key, open_id + '$$$$' + session_id)
        # 设置过期时间7天
        conn.expire(session_key, 60 * 60 * 24 * 7)
        data = {'token': session_key}

        return data

    def getOpenIdAndSessionKey(self,code):
        # 根据code获取open_id、session_key
        app_id = 'wxc999b4ac2adc328e'
        app_secret = '8b4f824b7d81a2a2b091eca8c9eeb2ba'
        url = 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code' % (
            app_id, app_secret, code)
        result = requests.get(url).json()
        data = []
        data.append(result['openid'])
        data.append(result['session_key'])
        return data


    def AuthSignByXml(self,xmlmsg):
        appid = xmlmsg['xml']['appid']
        bank_type = xmlmsg['xml']['bank_type']
        cash_fee = xmlmsg['xml']['cash_fee']
        fee_type = xmlmsg['xml']['fee_type']
        is_subscribe = xmlmsg['xml']['is_subscribe']
        mch_id = xmlmsg['xml']['mch_id']
        nonce_str = xmlmsg['xml']['nonce_str']
        openid = xmlmsg['xml']['openid']
        out_trade_no = xmlmsg['xml']['out_trade_no']
        result_code = xmlmsg['xml']['result_code']
        return_code = xmlmsg['xml']['return_code']
        # sign = xmlmsg['xml']['sign']
        time_end = xmlmsg['xml']['time_end']
        total_fee = xmlmsg['xml']['total_fee']
        trade_type = xmlmsg['xml']['trade_type']
        transaction_id = xmlmsg['xml']['transaction_id']

        strs = []
        strs.append("appid=")
        strs.append(appid)
        strs.append("&bank_type=")
        strs.append(bank_type)
        strs.append("&cash_fee=")
        strs.append(cash_fee)
        strs.append("&fee_type=")
        strs.append(fee_type)
        strs.append("&is_subscribe=")
        strs.append(is_subscribe)
        strs.append("&mch_id=")
        strs.append(mch_id)
        strs.append("&nonce_str=")
        strs.append(nonce_str)
        strs.append("&openid=")
        strs.append(openid)
        strs.append("&out_trade_no=")
        strs.append(out_trade_no)
        strs.append("&result_code=")
        strs.append(result_code)
        strs.append("&return_code=")
        strs.append(return_code)
        strs.append("&time_end=")
        strs.append(time_end)
        strs.append("&total_fee=")
        strs.append(total_fee)
        strs.append("&trade_type=")
        strs.append(trade_type)
        strs.append("&transaction_id=")
        strs.append(transaction_id)
        strs.append("&key=")
        strs.append('guanxinguanxinguanxinguanxin3344')
        longstr = ''
        for s in strs:
            longstr += s


        # md5加密
        hash_md5 = hashlib.md5(longstr.encode('utf8'))
        sign = hash_md5.hexdigest().upper()
        return sign

    def timeout(self, time):
        '''
        判断是否超时
        '''
        import time
        time = str(time)[0:19]
        timeArray = time.strptime(time, "%Y-%m-%d %H:%M:%S")
        timeStamp = int(time.mktime(timeArray))
        is_timeout = (timeStamp + (60 * 60 * 24) - time.time() <= 0)
        return is_timeout