from rest_framework import viewsets, views
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import FileUploadParser, MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated


import json
import os

from .services import VirusTotalService
from .models import UrlReports, FileReports, Analyses, ScanHistory

from .serializers import (
    UrlReportsSerializer,
    FileReportsSerializer,
    AnalysesSerializer,
    ScanHistorySerializer,
    UploadSerializer
)


class ScanHistoryViewSet(viewsets.ModelViewSet):
    queryset = ScanHistory.objects.all()
    serializer_class = ScanHistorySerializer
    permission_classes = [IsAuthenticated]
    

class VirusTotalViewSet(viewsets.ModelViewSet):
    queryset = UrlReports.objects.all()
    serializer_class = (UrlReportsSerializer)
    permission_classes = [IsAuthenticated]
    
    @action(detail=False, methods=['post'], url_path='get-file-report')
    def get_file_report_by_id(self, request):
        scan_id = request.data.get("id")
        type = request.data.get("type")
        if not scan_id:
            return Response({"error": "ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        service = VirusTotalService()
        result = service.get_analyses(scan_id , type)
        if not result:
            return Response({"error": "Failed to get file report"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(result, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['post'], url_path='scan-hash')
    def get_file_hash_report(self, request):
        data = request.data
        file_hash = data.get("hash")
        if not file_hash:
            return Response({"error": "File hash is required"}, status=status.HTTP_400_BAD_REQUEST)
        service = VirusTotalService()
        result = service.scan_file_hash(file_hash)
        
        if not result:
            return Response({"error": "Failed to get file report"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(result, status=status.HTTP_200_OK)

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
        return Response(result, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'], url_path='get-analysis')
    def get_analysis_by_id(self, request):
        scan_id = request.GET.get("id")
        if not scan_id:
            return Response({"error": "ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        service = VirusTotalService()
        result = service.get_url_report(scan_id)
        if not result:
            return Response({"error": "Failed to get URL report"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(result, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['get'], url_path='get-comments')
    def get_comments_by_id(self, request):
        scan_id = request.GET.get("id")
        if not scan_id:
            return Response({"error": "ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        service = VirusTotalService()
        result = service.get_comments(scan_id)
        if not result:
            return Response({"error": "Failed to get URL comments"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(result, status=status.HTTP_200_OK)


class UrlReportViewSet(viewsets.ModelViewSet):
    queryset = UrlReports.objects.all()
    serializer_class = UrlReportsSerializer
    analysis = Analyses.objects.all()
    analysis_serializer = AnalysesSerializer
    permission_classes = [IsAuthenticated]
    
    def create (self, request):
        if not request.user.is_authenticated:
            return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
        data = request.data
        data["user"] = request.user.id
        if not data["analysis"]:
            return Response({"error": "Analysis is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = UrlReportsSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class FileUploadViewSet(viewsets.ModelViewSet):
    queryset = FileReports.objects.all()
    serializer_class = FileReportsSerializer
    parser_classes = (MultiPartParser, FormParser)
    analysis = Analyses.objects.all()
    analysis_serializer = AnalysesSerializer
    permission_classes = [IsAuthenticated]
    
    def create(self, request):
        if not request.user.is_authenticated:
            return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
        
        data = request.data
        data["user"] = request.user.id
        if not data["analysis"]:
            return Response({"error": "Analysis is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = FileReportsSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['post'], url_path='scan-file')
    def get_file_report(self, request):
        uploaded_file = request.FILES.get("file")
        content_type = uploaded_file.content_type
        
        if not uploaded_file:
            return Response({"error": "File is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        files = {
            "file": (uploaded_file.name, uploaded_file.read(), uploaded_file.content_type)
        }
        service = VirusTotalService()
        result = service.scan_file(files)
        
        if not result:
            return Response({"error": "Failed to scan file"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        return Response(result, status=status.HTTP_200_OK)
    
    
    