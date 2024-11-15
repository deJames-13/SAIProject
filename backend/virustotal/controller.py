from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
import json

from .models import UrlReports
from .serializers import UrlReportsSerializer
from .services import VirusTotalService


class VirusTotalViewSet(viewsets.ModelViewSet):
    queryset = UrlReports.objects.all()
    serializer_class = UrlReportsSerializer

    @action(detail=False, methods=['post'], url_path='scan-url')
    def get_url_report(self, request):
        data = request.data
        url = data.get("url")
        if not url:
            return Response({"error": "URL is required"}, status=status.HTTP_400_BAD_REQUEST)
        service = VirusTotalService()
        result = service.scan_url(url)
        if not result:
            return Response({"error": "Failed to get URL report"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(result)

    @action(detail=False, methods=['get'], url_path='get-analysis')
    def get_analysis_by_id(self, request):
        scan_id = request.GET.get("id")
        if not scan_id:
            return Response({"error": "ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        service = VirusTotalService()
        result = service.get_url_report(scan_id)
        if not result:
            return Response({"error": "Failed to get URL report"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(result)


class UrlReportViewSet(viewsets.ModelViewSet):
    queryset = UrlReports.objects.all()
    serializer_class = UrlReportsSerializer
    
    # /
    def list(self, request):
        reports = UrlReports.objects.all()
        serializer = UrlReportsSerializer(reports, many=True)
        return Response(serializer.data)

    # /{pk}
    def retrieve(self, request, pk=None):
        report = self.get_object()
        serializer = UrlReportsSerializer(report)
        return Response(serializer.data)

    # /create
    def create(self, request):
        data = request.data
        serializer = UrlReportsSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # /{pk}/update
    def update(self, request, pk=None):
        report = self.get_object()
        serializer = UrlReportsSerializer(report, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # /{pk}/delete
    def destroy(self, request, pk=None):
        report = self.get_object()
        report.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    