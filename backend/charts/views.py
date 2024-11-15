from django.shortcuts import render
from django.http import JsonResponse
import random
from datetime import datetime, timedelta
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes

@api_view(['GET'])
@permission_classes([AllowAny])  # Make this specific view public

def get_scan_data(request):
    # Sample data for demonstration
    sample_data = [
        {"date": "Mon", "scans": 150},   # Monday
        {"date": "Tue", "scans": 160},   # Tuesday
        {"date": "Wed", "scans": 200},   # Wednesday
        {"date": "Thu", "scans": 180},   # Thursday
        {"date": "Fri", "scans": 190},   # Friday
        {"date": "Sat", "scans": 200},   # Friday
        {"date": "Sun", "scans": 250},   # Friday
    ]
    return Response(sample_data)

def get_aggregate_summary(request):
    # Sample data for demonstration (daily summary)
    aggregate_data = [
        {"date": "Mon", "total_scans": 150, "avg_scans": 150},   # Monday
        {"date": "Tue", "total_scans": 160, "avg_scans": 160},   # Tuesday
        {"date": "Wed", "total_scans": 200, "avg_scans": 200},   # Wednesday
        {"date": "Thu", "total_scans": 180, "avg_scans": 180},   # Thursday
        {"date": "Fri", "total_scans": 190, "avg_scans": 190},   # Friday
        {"date": "Sat", "total_scans": 200, "avg_scans": 200},   # Saturday
        {"date": "Sun", "total_scans": 250, "avg_scans": 250},   # Sunday
    ]
    return JsonResponse(aggregate_data, safe=False)

def get_pie_chart_data(request):
    # Sample data for demonstration (pie chart with scan categories)
    pie_data = [
        {"category": "Malware", "scans": 300},   # Malware scans
        {"category": "Clean", "scans": 500},     # Clean scans
        {"category": "Suspicious", "scans": 150},  # Suspicious scans
    ]
    return JsonResponse(pie_data, safe=False)