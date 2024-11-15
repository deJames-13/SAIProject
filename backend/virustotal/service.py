import requests
import os
from django.conf import settings

API_KEY = settings.VIRUSTOTAL_API
BASE_URL = settings.VIRUSTOTAL_URL

class VirusTotalService:
    def __init__(self):
        self.api_key = API_KEY
        self.base_url = BASE_URL
        if not self.base_url:
            raise ValueError("BASE_URL is not set in settings")

    def scan_url(self, url):
        scan_url = f"{self.base_url}/urls"
        payload = {"url": url}
        headers = {
            "accept": "application/json",
            "content-type": "application/x-www-form-urlencoded",
            "x-apikey": self.api_key
        }
        response = requests.post(scan_url, data=payload, headers=headers)
        if response.status_code == 200:
            response = response.json()
            data = response.get("data")
            if data.get("id"):
                data['analyses'] = self.get_url_report(data.get("id"))
            return data
        else:
            print(f"An error occurred: {response.status_code} - {response.text}")
            return None
        
    def get_url_report(self, scan_id):
        report_url = f"{self.base_url}/analyses/{scan_id}"
        headers = {
            "accept": "application/json",
            "x-apikey": self.api_key
        }
        response = requests.get(report_url, headers=headers)
        if response.status_code == 200:
            return response.json()
        else:
            print(f"An error occurred: {response.status_code} - {response.text}")
            return None


