from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .controller import VirusTotalViewSet, UrlReportViewSet, FileUploadViewSet, ScanHistoryViewSet


router = DefaultRouter()
router.register(r'virustotal', VirusTotalViewSet, basename='virustotal')
router.register(r'file-reports', FileUploadViewSet, basename='file-reports')
router.register(r'url-reports', UrlReportViewSet, basename='url-reports')
router.register(r'scan-history', ScanHistoryViewSet, basename='scan-history')

urlpatterns = [
    path('', include(router.urls)),
]