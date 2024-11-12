from django.shortcuts import render
from django.http import JsonResponse
import random
from datetime import datetime, timedelta

# Helper function to generate random scan data
def generate_fake_data():
    scan_types = ['malicious', 'suspicious', 'clean']
    data = {scan: random.randint(10, 100) for scan in scan_types}
    return data

# View for Pie Chart data
def pie_chart_data(request):
    data = generate_fake_data()
    return JsonResponse(data)

# View for Bar Chart data (e.g., scans per day)
def bar_chart_data(request):
    days = [f"Day {i}" for i in range(1, 8)]
    data = {
        "labels": days,
        "data": [random.randint(20, 150) for _ in days]
    }
    return JsonResponse(data)

# View for Line Chart data (trend over time)
def line_chart_data(request):
    dates = [(datetime.now() - timedelta(days=i)).strftime('%Y-%m-%d') for i in range(7)]
    data = {
        "labels": dates,
        "data": [random.randint(30, 200) for _ in dates]
    }
    return JsonResponse(data)
