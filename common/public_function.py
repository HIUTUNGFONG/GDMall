import os


class PublicFunction(object):

    def get3rd_session(self):
        '''
        生成一个3rd随机数
        '''
        return os.popen('head -n 80 /dev/urandom | tr -dc A-Za-z0-9 | head -c 64').read()
