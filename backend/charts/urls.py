# from django.urls import path
# from . import views

# urlpatterns = [
#     path('scan-data/', views.get_scan_data, name='scan-data'),
#     path('aggregate-summary/', views.get_aggregate_summary, name='aggregate-summary'),
#     path('pie-data/', views.get_pie_chart_data, name='pie-data'),

# ]

# from django.urls import path
# from . import views

# urlpatterns = [
#     path('fetch-data/', views.fetch_virustotal_data, name='fetch_data'),
#     path('fetch-stats/', views.fetch_virustotal_stats, name='fetch_stats'),
#     path('fetch-url-report/', views.fetch_url_report, name='fetch-url-report'),
# ]


from django.urls import path
from .views import fetch_virustotal_stats, fetch_virustotal_detection_types

urlpatterns = [
    path('api/virustotal-stats/', fetch_virustotal_stats, name='fetch_virustotal_stats'),
    path('api/virustotal-detection-types/', fetch_virustotal_detection_types, name='fetch_virustotal_detection_types'),
]
