from django.urls import path
from . import views

urlpatterns = [
    path('pie-chart-data/', views.pie_chart_data, name='pie-chart-data'),
    path('bar-chart-data/', views.bar_chart_data, name='bar-chart-data'),
    path('line-chart-data/', views.line_chart_data, name='line-chart-data'),
]

