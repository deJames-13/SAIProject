import requests
import hashlib
import random
from django.http import JsonResponse
from decouple import config

API_KEY = config('VIRUSTOTAL_API_KEY')
BASE_URL = "https://www.virustotal.com/api/v3/urls"

# URLs to be checked
urls = [
    "https://www.webanalyzer.net/en/www/17ebook.co",
    "https://www.goldskysecurity.com/the-history-and-impact-of-the-iloveyou-virus/",
    "https://www.genome.gov/genetics-glossary/Virus",
    "https://putlockervideos.com/",
    "https://tubemp4.is/",
    "https://www.chess.com/",
]

def fetch_virustotal_stats(request):
    headers = {
        "x-apikey": API_KEY
    }
    detections = []

    # Function to generate random fake data
    def generate_fake_data():
        return {
            "harmless": random.randint(40, 60),  # Random harmless between 40 and 60
            "malicious": random.randint(0, 5),   # Random malicious between 0 and 5
            "suspicious": random.randint(0, 3),  # Random suspicious between 0 and 3
            "undetected": random.randint(30, 50) # Random undetected between 30 and 50
        }

    for url in urls:
        try:
            # Step 1: Submit the URL for analysis (POST request)
            response = requests.post(BASE_URL, headers=headers, data={"url": url})
            if response.status_code == 429:
                # If we hit the 429 error, use randomly generated fake data
                fake_data = generate_fake_data()
                detections.append({
                    "url": url,
                    "harmless": fake_data["harmless"],
                    "malicious": fake_data["malicious"],
                    "suspicious": fake_data["suspicious"],
                    "undetected": fake_data["undetected"],
                    "error": "Rate limited by VirusTotal. Using default random data."
                })
                continue  # Skip further requests for this URL
            
            # If status code isn't 429, continue as normal
            if response.status_code != 200:
                detections.append({
                    "url": url,
                    "error": f"Failed to submit URL. Status code: {response.status_code}"
                })
                continue

            # Step 2: Get the URL ID (SHA-256 hash of the URL)
            url_id = hashlib.sha256(url.encode()).hexdigest()

            # Step 3: Fetch the analysis results using the URL ID (GET request)
            analysis_response = requests.get(f"{BASE_URL}/{url_id}", headers=headers)
            if analysis_response.status_code == 200:
                data = analysis_response.json()
                stats = data.get("data", {}).get("attributes", {}).get("last_analysis_stats", {})
                detections.append({
                    "url": url,
                    "harmless": stats.get("harmless", 0),
                    "malicious": stats.get("malicious", 0),
                    "suspicious": stats.get("suspicious", 0),
                    "undetected": stats.get("undetected", 0)
                })
            else:
                detections.append({
                    "url": url,
                    "error": f"Failed to fetch analysis results. Status code: {analysis_response.status_code}"
                })
        except Exception as e:
            detections.append({
                "url": url,
                "error": str(e)
            })

    return JsonResponse(detections, safe=False)

def fetch_virustotal_detection_types(request):
    headers = {
        "x-apikey": API_KEY
    }
    urls = [
        "https://www.webanalyzer.net/en/www/17ebook.co",
        "https://www.goldskysecurity.com/the-history-and-impact-of-the-iloveyou-virus/",
        "https://www.genome.gov/genetics-glossary/Virus",
        "https://putlockervideos.com/",
        "https://tubemp4.is/",
        "https://www.chess.com/",
    ]
    detection_types = []

    # Function to generate random fake data for detection types
    def generate_fake_data():
        return {
            "phishing": random.randint(0, 5),
            "malware": random.randint(0, 5),
            "spam": random.randint(0, 3),
            "clean": random.randint(30, 50)
        }

    for url in urls:
        try:
            # Submit the URL for analysis (POST request)
            response = requests.post(BASE_URL, headers=headers, data={"url": url})
            if response.status_code == 429:
                # Rate-limited: Use fake data
                fake_data = generate_fake_data()
                detection_types.append({
                    "url": url,
                    "phishing": fake_data["phishing"],
                    "malware": fake_data["malware"],
                    "spam": fake_data["spam"],
                    "clean": fake_data["clean"],
                    "error": "Rate limited by VirusTotal. Using default random data."
                })
                continue

            if response.status_code != 200:
                detection_types.append({
                    "url": url,
                    "error": f"Failed to submit URL. Status code: {response.status_code}"
                })
                continue

            # Get the URL ID (SHA-256 hash of the URL)
            url_id = hashlib.sha256(url.encode()).hexdigest()

            # Fetch analysis results using the URL ID (GET request)
            analysis_response = requests.get(f"{BASE_URL}/{url_id}", headers=headers)
            if analysis_response.status_code == 200:
                data = analysis_response.json()
                categories = data.get("data", {}).get("attributes", {}).get("categories", {})
                detection_types.append({
                    "url": url,
                    "phishing": categories.get("phishing", 0),
                    "malware": categories.get("malware", 0),
                    "spam": categories.get("spam", 0),
                    "clean": categories.get("clean", 0)
                })
            else:
                detection_types.append({
                    "url": url,
                    "error": f"Failed to fetch analysis results. Status code: {analysis_response.status_code}"
                })
        except Exception as e:
            detection_types.append({
                "url": url,
                "error": str(e)
            })

    return JsonResponse(detection_types, safe=False)
