from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from django.utils import timezone
from django.db.models import Sum

from .services import VirusTotalService
from .models import UrlReports, FileReports, Analyses, ScanHistory
from .serializers import UrlReportsSerializer, FileReportsSerializer, ScanHistorySerializer


class ScanHistoryViewSet(viewsets.ModelViewSet):
    serializer_class = ScanHistorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return ScanHistory.objects.filter(user=self.request.user)

    @action(detail=False, methods=['get'], url_path='all-with-deleted')
    def list_all_with_deleted(self, request):
        queryset = ScanHistory.objects.all_with_deleted().filter(user=request.user)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='deleted-only')
    def list_deleted_only(self, request):
        queryset = ScanHistory.objects.deleted_only().filter(user=request.user)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['post'], url_path='restore')
    def restore(self, request):
        id = request.data.get('id')
        if not id:
            return Response({"error": "ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            instance = ScanHistory.objects.all_with_deleted().filter(user=request.user).get(id=id)
            instance.restore()
            return Response({"message": "ScanHistory restored successfully"}, status=status.HTTP_200_OK)
        except ScanHistory.DoesNotExist:
            return Response({"error": "ScanHistory not found"}, status=status.HTTP_404_NOT_FOUND)


class UrlReportViewSet(viewsets.ModelViewSet):
    serializer_class = UrlReportsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return UrlReports.objects.filter(user=self.request.user)

    def create(self, request):
        if not request.user.is_authenticated:
            return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
        data = request.data.copy()
        data["user"] = request.user.id
        if not data.get("analysis"):
            return Response({"error": "Analysis is required"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = UrlReportsSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'], url_path='all-with-deleted')
    def list_all_with_deleted(self, request):
        queryset = UrlReports.objects.all_with_deleted().filter(user=request.user)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='deleted-only')
    def list_deleted_only(self, request):
        queryset = UrlReports.objects.deleted_only().filter(user=request.user)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['post'], url_path='restore')
    def restore(self, request):
        id = request.data.get('id')
        if not id:
            return Response({"error": "ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            instance = UrlReports.objects.all_with_deleted().filter(user=request.user).get(id=id)
            instance.restore()
            return Response({"message": "UrlReports restored successfully"}, status=status.HTTP_200_OK)
        except UrlReports.DoesNotExist:
            return Response({"error": "UrlReports not found"}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'], url_path='multi-delete')
    def multi_delete(self, request):
        data = request.data
        ids = data.get("ids")
        if not ids:
            return Response({"error": "IDs are required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            instances = UrlReports.objects.filter(id__in=ids, user=request.user)
            instances.update(is_deleted=True, deleted_at=timezone.now())
            return Response({"message": "UrlReports deleted successfully"}, status=status.HTTP_200_OK)
        except UrlReports.DoesNotExist:
            return Response({"error": "UrlReports not found"}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'], url_path='multi-restore')
    def multi_restore(self, request):
        data = request.data
        ids = data.get("ids")
        if not ids:
            return Response({"error": "IDs are required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            instances = UrlReports.objects.all_with_deleted().filter(id__in=ids, user=request.user)
            instances.update(is_deleted=False, deleted_at=None)
            return Response({"message": "UrlReports restored successfully"}, status=status.HTTP_200_OK)
        except UrlReports.DoesNotExist:
            return Response({"error": "UrlReports not found"}, status=status.HTTP_404_NOT_FOUND)


class FileUploadViewSet(viewsets.ModelViewSet):
    serializer_class = FileReportsSerializer
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return FileReports.objects.filter(user=self.request.user)

    def create(self, request):
        if not request.user.is_authenticated:
            return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)

        data = request.data.copy()
        data["user"] = request.user.id
        if not data.get("analysis"):
            return Response({"error": "Analysis is required"}, status=status.HTTP_400_BAD_REQUEST)

        if type(data["analysis"]) == str:
            data["analysis"] = dict(json.loads(data["analysis"]))

        serializer = FileReportsSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'], url_path='all-with-deleted')
    def list_all_with_deleted(self, request):
        queryset = FileReports.objects.all_with_deleted().filter(user=request.user)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='deleted-only')
    def list_deleted_only(self, request):
        queryset = FileReports.objects.deleted_only().filter(user=request.user)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['post'], url_path='scan-file')
    def get_file_report(self, request):
        uploaded_file = request.FILES.get("file")
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

    @action(detail=False, methods=['post'], url_path='restore')
    def restore(self, request):
        id = request.data.get('id')
        if not id:
            return Response({"error": "ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            instance = FileReports.objects.all_with_deleted().filter(user=request.user).get(id=id)
            instance.restore()
            return Response({"message": "FileReports restored successfully"}, status=status.HTTP_200_OK)
        except FileReports.DoesNotExist:
            return Response({"error": "FileReports not found"}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'], url_path='multi-delete')
    def multi_delete(self, request):
        data = request.data
        ids = data.get("ids")
        if not ids:
            return Response({"error": "IDs are required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            instances = FileReports.objects.filter(id__in=ids, user=request.user)
            instances.update(is_deleted=True, deleted_at=timezone.now())
            return Response({"message": "FileReports deleted successfully"}, status=status.HTTP_200_OK)
        except FileReports.DoesNotExist:
            return Response({"error": "FileReports not found"}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'], url_path='multi-restore')
    def multi_restore(self, request):
        data = request.data
        ids = data.get("ids")
        if not ids:
            return Response({"error": "IDs are required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            instances = FileReports.objects.all_with_deleted().filter(id__in=ids, user=request.user)
            instances.update(is_deleted=False, deleted_at=None)
            return Response({"message": "FileReports restored successfully"}, status=status.HTTP_200_OK)
        except FileReports.DoesNotExist:
            return Response({"error": "FileReports not found"}, status=status.HTTP_404_NOT_FOUND)


class VirusTotalViewSet(viewsets.ModelViewSet):
    serializer_class = UrlReportsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return UrlReports.objects.filter(user=self.request.user)
    
    @action(detail=False, methods=['get'], url_path='bentobox-data')
    def bentobox_data(self, request):
        user = request.user
        scanned_url_count = UrlReports.objects.filter(user=user).count()
        scanned_files_count = FileReports.objects.filter(user=user).count()
        total_scans = scanned_url_count + scanned_files_count
        
        analysis_stats = {
            "harmless": 0,
            "malicious": 0,
            "suspicious": 0,
            "undetected": 0,
            "timeout": 0
        }
        # Aggregate analysis stats for URL reports
        url_analysis_stats = Analyses.objects.filter(
            id__in=UrlReports.objects.filter(user=user).values_list('analysis_id', flat=True)
        ).values_list('last_analysis_stats', flat=True)
        for stats in url_analysis_stats:
            for key in analysis_stats.keys():
                analysis_stats[key] += stats.get(key, 0)  # Default to 0 if the key doesn't exist

        # Aggregate analysis stats for file reports
        file_analysis_stats = Analyses.objects.filter(
            id__in=FileReports.objects.filter(user=user).values_list('analysis_id', flat=True)
        ).values_list('last_analysis_stats', flat=True)
        for stats in file_analysis_stats:
            for key in analysis_stats.keys():
                analysis_stats[key] += stats.get(key, 0)  # Default to 0 if the key doesn't exist



        data = {
            "scanned_url": scanned_url_count,
            "scanned_files": scanned_files_count,
            "total_scans": total_scans,
            "stats": analysis_stats
        }
        return Response(data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'], url_path='get-file-report')
    def get_file_report_by_id(self, request):
        scan_id = request.data.get("id")
        type = request.data.get("type")
        if not scan_id:
            return Response({"error": "ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        service = VirusTotalService()
        result = service.get_analyses(scan_id, type)
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