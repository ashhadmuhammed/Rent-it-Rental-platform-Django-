
from django.contrib import admin
from django.urls import path
from myapp import views
 
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name='index'),
    path('create/',views.create, name='create'),
    path('read/',views.read, name='read'),
    path('edit/<id>',views.edit, name='edit'),
    path('edit/update/<id>',views.update, name='update'),
    path('delete/<id>',views.delete, name='delete'),
]