from django.shortcuts import render
from rest_framework import viewsets, views
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

import json
import os

# Create your views here.

class MetaDataViewSet(views.APIView):
    
    def bentobox_data(self, request):
        data = {
            "scanned_url": 10,
            "scanned_files": 20,
            "total_scans": 30,
            "malicious": 5,
        }
        return Response(data, status=status.HTTP_200_OK)


class ChartDataViewSet(vies.APIView):
    
    # VirusTOTAL Report Stats Pie Chart
    def reports_data(self, request):
        data: [
            {
                'malicous': 5,
                'undetected': 10,
                'suspicious': 2,
                'unknown': 3,
            }
        ]
        return Response(data, status=status.HTTP_200_OK)
