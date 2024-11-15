import requests
import os

from django.conf import settings
from .models import UrlReports
from .serializers import UrlReportsSerializer

API_KEY = settings.VIRUSTOTAL_API
BASE_URL = settings.VIRUSTOTAL_URL

class VirusTotalService:
    def __init__(self):
        self.api_key = API_KEY
        self.base_url = BASE_URL
        if not self.base_url:
            raise ValueError("BASE_URL is not set in settings")
        
        
    def validate_file(self, file_path):
        if not os.path.exists(file_path):
            return False
        return True
        
    def delete_file_from_server(self, file_path):
        try:
            os.remove(file_path)
        except Exception as e:
            print(f"An error occurred: {e}")
        
    def scan_file(self, files):
        scan_url = f"{self.base_url}/files"
        headers = {
            "x-apikey": self.api_key
        }
        try:
            response = requests.post(scan_url, files=files, headers=headers)
            if response.status_code == 200:
                response = response.json()
                data = response.get("data")
                return data
            else:
                print(f"An error occurred: {response.status_code} - {response.text}")
                return None
        except Exception as e:
            print(f"An error occurred: {e}")
            return None
    
    def scan_file_hash(self, file_hash):
        scan_url = f"{self.base_url}/files/{file_hash}"
        headers = {
            "x-apikey": self.api_key
        }
        response = requests.get(scan_url, headers=headers)
        if response.status_code == 200:
            return response.json()
        else:
            print(f"An error occurred: {response.status_code} - {response.text}")
            return None

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
            return data
        else:
            print(f"An error occurred: {response.status_code} - {response.text}")
            return None
        
    def get_url_report(self, scan_id):
        url_id = scan_id.split("-")
        if len(url_id) > 1:
            scan_id = url_id[1]
        report_url = f"{self.base_url}/urls/{scan_id}"
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
    
        
    def get_comments(self, scan_id):
        url_id = scan_id.split("-")
        if len(url_id) > 1:
            scan_id = url_id[1]
        comments_url = f"{self.base_url}/urls/{scan_id}/comments?relationships=author"
        headers = {
            "accept": "application/json",
            "x-apikey": self.api_key
        }
        response = requests.get(comments_url, headers=headers)
        if response.status_code == 200:
            return response.json()
        else:
            print(f"An error occurred: {response.status_code} - {response.text}")
            return None
        
    def get_comment_details(self, id):
        comment_url = f"{self.base_url}/comments/id/{id}?relationships=author"
        headers = {
            "accept": "application/json",
            "x-apikey": self.api_key
        }
        response = requests.get(comment_url, headers=headers)
        if response.status_code == 200:
            return response.json()
        else:
            print(f"An error occurred: {response.status_code} - {response.text}")
            return None


    