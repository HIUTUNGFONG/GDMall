import hashlib
import random
import string
import time

import requests
import xmltodict as xmltodict


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
        params = {'xml': params}
        xml = xmltodict.unparse(params)
        response = requests.post(url, data=xml.encode('UTF8'), headers={'Content-Type': 'charset=utf-8'})
        msg = response.text
        xmlmsg = xmltodict.parse(msg)
        return xmlmsg

# p = PublicFunction()
# str = p.randomStr()
# print(str)
# print(time.asctime(time.localtime(time.time())))
# print(time.localtime().tm_year)
# print(time.strftime('%Y%m%d%H%M%S'))
# print(p.orderNum())
