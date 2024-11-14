
from django.urls import path
from . import views

urlpatterns = [
    path('scan-url/', views.get_url_report, name='get_url_report'),
    path('get-analysis/', views.get_analysis_by_id, name='get_analysis_by_id'),
    
]