from django.urls import path
from . import views

urlpatterns = [
    path('scan-data/', views.get_scan_data, name='scan-data'),
    path('aggregate-summary/', views.get_aggregate_summary, name='aggregate-summary'),
    path('pie-data/', views.get_pie_chart_data, name='pie-data'),

]


