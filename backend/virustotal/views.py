from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .service import VirusTotalService
from django.views.decorators.http import require_http_methods
import json

# SCAN FILE
@csrf_exempt
@require_http_methods(["POST"])
def get_url_report(request):
    data = json.loads(request.body)
    url = data.get("url")
    if not url:
        return JsonResponse({"error": "URL is required"}, status=400)
    service = VirusTotalService()
    result = service.scan_url(url)
    if not result:
        return JsonResponse({"error": "Failed to get URL report"}, status=500)
    return JsonResponse(result)

# GET ANALYSIS BY ID
@csrf_exempt
@require_http_methods(["GET"])
def get_analysis_by_id(request):
    scan_id = request.GET.get("id")
    if not scan_id:
        return JsonResponse({"error": "ID is required"}, status=400)
    service = VirusTotalService()
    result = service.get_url_report(scan_id)
    if not result:
        return JsonResponse({"error": "Failed to get URL report"}, status=500)
    return JsonResponse(result)
