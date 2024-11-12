from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .service import VirusTotalService
import json


@csrf_exempt
def get_url_report(request):
    if request.method == "POST":
        data = json.loads(request.body)
        url = data.get("url")
        if url:
            service = VirusTotalService()
            result = service.scan_url(url)
            if result:
                return JsonResponse(result)
            else:
                return JsonResponse({"error": "Failed to get URL report"}, status=500)
        else:
            return JsonResponse({"error": "URL is required"}, status=400)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)
