from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from . import views

urlpatterns=[
    
    #path('',views.home,name='home'),
    path('recognise',views.recognise,name='recognition'),
    path('home',views.home,name='home'),
    path('user/addPerson',views.addPerson,name='submitted'),
    path('logs',views.logs,name="logs"),
    path('logsOf',views.logsOf,name="logsOf")
    
]


if settings.DEBUG:
    urlpatterns+=static(settings.STATIC_URL,document_root=settings.STATIC_ROOT)