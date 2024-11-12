from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .service import VirusTotalService
from django.views.decorators.http import require_http_methods
import json


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
    
