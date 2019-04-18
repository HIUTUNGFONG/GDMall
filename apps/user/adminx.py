from xadmin import views
import xadmin             # 导入xadmin



class BaseSetting(object):
    enable_themes = True            #开启主题
    use_bootswatch = True           #开启主题


class GlobalSetting(object):
    site_title = 'Grotesquery后台管理'        #顶部标题
    site_footer = '怪诞服装有限公司'              #底部标题
    menu_style = 'accordion'               #折叠侧边栏

xadmin.site.register(views.BaseAdminView,BaseSetting)   #注册主题
xadmin.site.register(views.CommAdminView,GlobalSetting) #注册标题
#
# #注册app模块到各自app下新建xadminx.py中写入以下代码
# #案例导入邮箱模块
# from users.models import EmailVerifyRecord                          # 导入要注册的模块
# class EmailVerifyRecordAdmin(object):
#       list_display = ['code','email','send_type','send_time']         #界面显示字段
#       list_filter = ['code','email','send_type','send_time']          #添加过滤栏，
#       search_fields = ['code','email','send_type']     #警告外键搜索要指定字段code__name添code下的name字段加搜索框去掉时间字段
# #最后一步关鸾注册
# xadmin.site.register(EmailVerifyRecord,EmailVerifyRecordAdmin)  #关联注册EmailVerifyRecord模块，1是导入的模型，2是要加入的模型类
# # 一对多
# # 侧边栏app设置中文
# # 1. 找到app应用下的 apps.py
# class OrganizationConfig(AppConfig):
#     name = 'organization'
#     verbose_name = "授课机构"     #  自定义名称
# #2. 找到app应用下的 __init__.py 添加:
# default_app_config = 'app名称.apps.app名称Config'      # 添加代码，应用名称加Config