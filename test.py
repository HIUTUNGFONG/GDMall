# import hashlib
#
# import weixin
# from bs4 import BeautifulSoup
# import xmltodict
# #
# #
# # def get_sign(data_dict, key):
# #   """
# #   签名函数
# #   :param data_dict: 需要签名的参数，格式为字典
# #   :param key: 密钥 ，即上面的API_KEY
# #   :return: 字符串
# #   """
# #   params_list = sorted(data_dict.items(), key=lambda e: e[0], reverse=False) # 参数字典倒排序为列表
# #   params_str = "&".join(u"{}={}".format(k, v) for k, v in params_list) + '&key=' + key
# #   # 组织参数字符串并在末尾添加商户交易密钥
# #   md5 = hashlib.md5() # 使用MD5加密模式
# #   md5.update(params_str.encode('utf-8')) # 将参数字符串传入
# #   sign = md5.hexdigest().upper() # 完成加密并转为大写
# #   return sign
# #
# #
# # def trans_dict_to_xml(data_dict): # 定义字典转XML的函数
# #   data_xml = []
# #   for k in sorted(data_dict.keys()): # 遍历字典排序后的key
# #     v = data_dict.get(k) # 取出字典中key对应的value
# #     if k == 'detail' and not v.startswith('<![CDATA['): # 添加XML标记
# #       v = '<![CDATA[{}]]>'.format(v)
# #     data_xmlstrs.append('<{key}>{value}</{key}>'.format(key=k, value=v))
# #   return '<xml>{}</xml>'.format(''.join(data_xml)).encode('utf-8') # 返回XML，并转成utf-8，解决中文的问题
# #
# #
# #
# # def trans_xml_to_dict(data_xml):
# #   soup = BeautifulSoup(data_xml, features='xml')
# #   xml = soup.find('xml') # 解析XML
# #   if not xml:
# #     return {}
# #   data_dict = dict([(item.name, item.text) for item in xml.find_all()])
# #   return data_dict
# #
# #
# xml = """<xml>
# <appid><![CDATA[wxc999b4ac2adc328e]]></appid>
# <bank_type><![CDATA[CFT]]></bank_type>
# <cash_fee><![CDATA[1]]></cash_fee>
# <fee_type><![CDATA[CNY]]></fee_type>
# <is_subscribe><![CDATA[N]]></is_subscribe>
# <mch_id><![CDATA[1535717001]]></mch_id>
# <nonce_str><![CDATA[0reyRZXV1moq6tpUjiawPO4xDNbBsA3E]]></nonce_str>
# <openid><![CDATA[oxkaL5VgOfci-vg8_PvqEpS28xeI]]></openid>
# <out_trade_no><![CDATA[20190616235404443277]]></out_trade_no>
# <result_code><![CDATA[SUCCESS]]></result_code>
# <return_code><![CDATA[SUCCESS]]></return_code>
# <sign><![CDATA[9E1A15EBAEA28861C52F83AEF723C428]]></sign>
# <time_end><![CDATA[20190616235412]]></time_end>
# <total_fee>1</total_fee>
# <trade_type><![CDATA[JSAPI]]></trade_type>
# <transaction_id><![CDATA[4200000310201906169381847514]]></transaction_id>
# </xml>
# """
# # msg = ss.decode('utf-8')
# # print(msg)
# xmlmsg = xmltodict.parse(xml)
# print(xmlmsg)
# appid = xmlmsg['xml']['appid']
# bank_type = xmlmsg['xml']['bank_type']
# cash_fee = xmlmsg['xml']['cash_fee']
# fee_type = xmlmsg['xml']['fee_type']
# is_subscribe = xmlmsg['xml']['is_subscribe']
# mch_id = xmlmsg['xml']['mch_id']
# nonce_str = xmlmsg['xml']['nonce_str']
# openid = xmlmsg['xml']['openid']
# out_trade_no = xmlmsg['xml']['out_trade_no']
# result_code = xmlmsg['xml']['result_code']
# return_code = xmlmsg['xml']['return_code']
# sign = xmlmsg['xml']['sign']
# time_end = xmlmsg['xml']['time_end']
# total_fee = xmlmsg['xml']['total_fee']
# trade_type = xmlmsg['xml']['trade_type']
# transaction_id = xmlmsg['xml']['transaction_id']
#
# strs = []
# strs.append("appid=")
# strs.append(appid)
# strs.append("&bank_type=")
# strs.append(bank_type)
# strs.append("&cash_fee=")
# strs.append(cash_fee)
# strs.append("&fee_type=")
# strs.append(fee_type)
# strs.append("&is_subscribe=")
# strs.append(is_subscribe)
# strs.append("&mch_id=")
# strs.append(mch_id)
# strs.append("&nonce_str=")
# strs.append(nonce_str)
# strs.append("&openid=")
# strs.append(openid)
# strs.append("&out_trade_no=")
# strs.append(out_trade_no)
# strs.append("&result_code=")
# strs.append(result_code)
# strs.append("&return_code=")
# strs.append(return_code)
# strs.append("&time_end=")
# strs.append(time_end)
# strs.append("&total_fee=")
# strs.append(total_fee)
# strs.append("&trade_type=")
# strs.append(trade_type)
# strs.append("&transaction_id=")
# strs.append(transaction_id)
# strs.append("&key=")
# strs.append('guanxinguanxinguanxinguanxin3344')
# longstr = ''
# for s in strs:
#   longstr += s
# print(longstr)
#
#
# # md5加密
# hash_md5 = hashlib.md5(longstr.encode('utf8'))
# sign = hash_md5.hexdigest().upper()
# print(sign)
#
#
# #
# #
# # sss= trans_xml_to_dict(ss)
# # print(sss)
# # sign = get_sign(xmlmsg,'guanxinguanxinguanxinguanxin3344')
# # print(sign)
# #
# # # from weixin.pay import WeixinPay, WeixinPayError
# # # # 或者
# # # # from weixin import WeixinPay, WeixinError
# # #
# # # data = weixin.to_dict(ss)
# # #
# # # pay = WeixinPay('wxc999b4ac2adc328e', '1535717001', 'guanxinguanxinguanxinguanxin3344', 'http://www.grotesquery.cn/api/pay/get') # 后两个参数可选
# # # # print(pay.check(data))
# # import random
import time
# #
# # ss = time.strftime('%Y%m%d%H%M%S') + str(random.randint(100000, 999999))
# # print(ss)
# # print(len('20190618232338173893'))
ss = time.strftime('%Y-%m-%d- %H:%M:%S')
print(ss)