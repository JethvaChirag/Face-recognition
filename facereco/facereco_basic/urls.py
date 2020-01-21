from django.urls import path

from . import views

urlpatterns=[
    
    path('',views.home,name='home'),
    path('recognise',views.recognise,name='recognition')
    #path('upload2',views.uploadImage2,name='uploadImage2')

]