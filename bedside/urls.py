#from djangorestframework.resources import ModelResource
#from djangorestframework.views import ListOrCreateModelView, InstanceModelView
from django.conf.urls.defaults import patterns, include, url
from django.contrib.auth.views import login
#from views import Givings, Giving

# Uncomment the next two lines to enable the admin:
#from django.contrib import admin
#admin.autodiscover()

urlpatterns = patterns('bedside.views',
    # Examples:
    # url(r'^$', 'prose_django.views.home', name='home'),
    # url(r'^prose_django/', include('prose_django.foo.urls')),
    #(r'^accounts/login/$', 'django.contrib.auth.views.login'),
    (r'^i18n/', include('django.conf.urls.i18n')),
	#url(r'^mobi/', 'mobi'),
	url(r'^app', 'app'),
	
	
	#url(r'^accounts/profile/$', 'givings'),
	#url(r'^givings/$', Givings.as_view(), name='givings'),
	#url(r'^givings/$', 'givings'),
	#url(r'^givings/(?P<gid>\d+)/$', Giving.as_view(), name='giving'),
	#url(r'^givings/compile/(?P<gid>\d+)/$', 'givings_compile_ui'),
	#url(r'^givings/getxml/(?P<gid>\d+)/$', 'givings_get_xml'),
)
