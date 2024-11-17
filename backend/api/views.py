from django.shortcuts import render
from rest_framework import views
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from virustotal.models import UrlReports, FileReports, Analyses

class MetaDataViewSet(views.APIView):
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'], url_path='bentobox-data')
    def bentobox_data(self, request):
        # Count the number of reports
        scanned_url_count = UrlReports.objects.count()
        scanned_files_count = FileReports.objects.count()
        total_scans = scanned_url_count + scanned_files_count

        # Aggregate analysis stats
        analysis_stats = Analyses.objects.aggregate(
            harmless=models.Sum('last_analysis_stats__harmless'),
            malicious=models.Sum('last_analysis_stats__malicious'),
            suspicious=models.Sum('last_analysis_stats__suspicious'),
            undetected=models.Sum('last_analysis_stats__undetected'),
            timeout=models.Sum('last_analysis_stats__timeout')
        )

        data = {
            "scanned_url": scanned_url_count,
            "scanned_files": scanned_files_count,
            "total_scans": total_scans,
            "malicious": analysis_stats['malicious'] or 0,
            "harmless": analysis_stats['harmless'] or 0,
            "suspicious": analysis_stats['suspicious'] or 0,
            "undetected": analysis_stats['undetected'] or 0,
            "timeout": analysis_stats['timeout'] or 0,
        }
        return Response(data, status=status.HTTP_200_OK)