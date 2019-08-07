from django.utils.deprecation import MiddlewareMixin

class MyDemo(MiddlewareMixin):
    def process_response(self,request,response):
        response['Access-Control-Allow-Origin']='*'
        return response