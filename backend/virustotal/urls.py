from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .controller import VirusTotalViewSet, UrlReportViewSet, FileUploadViewSet


router = DefaultRouter()
router.register(r'virustotal', VirusTotalViewSet, basename='virustotal')
router.register(r'virustotalfile', FileUploadViewSet, basename='virustotalfile')
router.register(r'url-reports', UrlReportViewSet, basename='url-reports')

urlpatterns = [
    path('', include(router.urls)),
]