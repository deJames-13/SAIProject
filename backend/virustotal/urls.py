from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .controller import VirusTotalViewSet, UrlReportViewSet


router = DefaultRouter()
router.register(r'virustotal', VirusTotalViewSet, basename='virustotal')
router.register(r'url-reports', UrlReportViewSet, basename='url-reports')

urlpatterns = [
    path('', include(router.urls)),
]