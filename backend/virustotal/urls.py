
from django.urls import path
from . import views

urlpatterns = [
    path('get_url_report/', views.get_url_report, name='get_url_report'),
]