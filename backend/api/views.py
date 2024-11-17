from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.db.models import Sum

from virustotal.models import UrlReports, FileReports, Analyses

class MetaDataViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'], url_path='bentobox-data')
    def bentobox_data(self, request):
        user = request.user

        # Count the number of reports for the authenticated user
        scanned_url_count = UrlReports.objects.filter(user=user).count()
        scanned_files_count = FileReports.objects.filter(user=user).count()
        total_scans = scanned_url_count + scanned_files_count

        # Aggregate analysis stats for the authenticated user
        analysis_stats = Analyses.objects.filter(
            urlreports__user=user
        ).aggregate(
            harmless=Sum('last_analysis_stats__harmless'),
            malicious=Sum('last_analysis_stats__malicious'),
            suspicious=Sum('last_analysis_stats__suspicious'),
            undetected=Sum('last_analysis_stats__undetected'),
            timeout=Sum('last_analysis_stats__timeout')
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