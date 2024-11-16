import requests
from django.http import JsonResponse
import time
import base64

# API_KEY = "e9f836f35a0a70ecdda033ff07bebafb883523e67ded84b4dc5b09c0679c4147"
API_KEY = "740055316e08ffaacd0f0be424db58b20f56710b9f13ec6d8caf6bde68d74e0b"
# API_KEY = "181a3b9c39ded06c43bc007e8a4fd030783eb6ccd3b1e02f2a096bc13024f8b0"
# API_KEY = "f6228c6a770207a82f103d57ddac0608409a48993b5243058d8eca96627f665d"
BASE_URL = "https://www.virustotal.com/api/v3/urls"

# Define the URLs to be checked
urls = [
    "https://www.webanalyzer.net/en/www/17ebook.co",
    "https://www.goldskysecurity.com/the-history-and-impact-of-the-iloveyou-virus/",
    "https://www.genome.gov/genetics-glossary/Virus",
    "https://putlockervideos.com/",
    "https://tubemp4.is/",
    "https://www.chess.com/",
    "https://www.friv.com/?gad_source=1&gclid=Cj0KCQiA_9u5BhCUARIsABbMSPsFcgfY_u13J2SVkDZG6HEWzNCXGzoOF4jduVD_m5VB8J05dYqEHsIaAr6eEALw_wcB",
    "https://www.w3.org/QA/Tips/noClickHere",
    "https://www.kaspersky.com/blog/cybersecurity-history-iloveyou/45001/"

]

def wait_for_analysis(analysis_id, headers, max_wait_time=120, wait_interval=5):
    analysis_url = f"https://www.virustotal.com/api/v3/analyses/{analysis_id}"
    start_time = time.time()

    while True:
        # Fetch the analysis status
        analysis_response = requests.get(analysis_url, headers=headers)
        
        if analysis_response.status_code == 200:
            analysis_data = analysis_response.json()
            
            # Log the response to check the status
            print(f"Analysis response for {analysis_id}: {analysis_data}")
            
            # Check if the analysis has completed
            status = analysis_data.get('data', {}).get('attributes', {}).get('status', '')
            if status == 'completed':
                return analysis_data
            else:
                # Wait for the next check
                if time.time() - start_time >= max_wait_time:
                    return None  # Timeout after max_wait_time
                time.sleep(wait_interval)  # Wait before checking again
        else:
            # Log the error in case of failure
            print(f"Failed to fetch analysis for {analysis_id}: {analysis_response.status_code}")
            return None  # If the request failed


def fetch_virustotal_data(request):
    stats = []

    headers = {"x-apikey": API_KEY}
    for url in urls:
        # Step 1: Submit the URL for analysis
        response = requests.post(BASE_URL, headers=headers, data={"url": url})
        if response.status_code == 200:
            result = response.json()

            # Check if an analysis ID is provided
            if 'data' in result and 'id' in result['data']:
                analysis_id = result['data']['id']
                time.sleep(2)  # Optional: Wait for the analysis to complete

                # Step 2: Fetch the analysis results using the analysis ID
                analysis_url = f"https://www.virustotal.com/api/v3/analyses/{analysis_id}"
                analysis_response = requests.get(analysis_url, headers=headers)
                if analysis_response.status_code == 200:
                    analysis_result = analysis_response.json()

                    # Check if 'attributes' and 'stats' are present
                    if 'data' in analysis_result and 'attributes' in analysis_result['data']:
                        votes = analysis_result['data']['attributes']['stats']
                        stats.append({
                            'url': url,
                            'harmless': votes.get('harmless', 0),
                            'malicious': votes.get('malicious', 0)
                        })
                    else:
                        stats.append({'url': url, 'error': 'Unexpected data structure in analysis result'})
                else:
                    stats.append({'url': url, 'error': 'Failed to fetch analysis results'})
            else:
                stats.append({'url': url, 'error': 'No analysis ID found'})
        else:
            stats.append({'url': url, 'error': response.status_code})

    return JsonResponse(stats, safe=False)

def fetch_virustotal_stats(request):
    stats_data = []

    headers = {"x-apikey": API_KEY}
    for url in urls:
        response = requests.post(BASE_URL, headers=headers, data={"url": url})
        if response.status_code == 200:
            result = response.json()

            if 'data' in result and 'id' in result['data']:
                analysis_id = result['data']['id']
                time.sleep(2)

                analysis_url = f"https://www.virustotal.com/api/v3/analyses/{analysis_id}"
                analysis_response = requests.get(analysis_url, headers=headers)
                if analysis_response.status_code == 200:
                    analysis_result = analysis_response.json()

                    if 'data' in analysis_result and 'attributes' in analysis_result['data']:
                        detections = analysis_result['data']['attributes'].get('stats', {}).get('malicious', 0)
                        stats_data.append({
                            'url': url,
                            'detections': detections,
                        })
                    else:
                        stats_data.append({'url': url, 'error': 'Unexpected data structure'})
                else:
                    stats_data.append({'url': url, 'error': 'Failed to fetch analysis results'})
            else:
                stats_data.append({'url': url, 'error': 'No analysis ID found'})
        else:
            stats_data.append({'url': url, 'error': response.status_code})

    return JsonResponse(stats_data, safe=False)


def fetch_virustotal_url_report(url):
    # Encode the URL in base64 as required by VirusTotal API
    encoded_url = base64.urlsafe_b64encode(url.encode()).decode().strip("=")
    
    # Set the headers with the API key
    headers = {
        "x-apikey": API_KEY
    }

    # Send a GET request to fetch the report
    response = requests.get(f"{BASE_URL}/{encoded_url}", headers=headers)
    
    if response.status_code == 200:
        data = response.json()
        
        # Extract relevant data
        url_data = data.get('data', {})
        attributes = url_data.get('attributes', {})
        
        # Extract status and reputation info
        last_analysis_stats = attributes.get('last_analysis_stats', {})
        last_analysis_results = attributes.get('last_analysis_results', {})
        
        # Check if the URL has been analyzed before
        analyzed = last_analysis_stats.get('malicious', 0) > 0 or last_analysis_stats.get('suspicious', 0) > 0

        # Return the gathered data
        return {
            "url": url,
            "status": "Analyzed" if analyzed else "Not analyzed",
            "reputation": last_analysis_stats,
            "last_analysis_results": last_analysis_results
        }
    else:
        return {
            "error": f"Failed to fetch URL report: {response.status_code}"
        }

def fetch_url_report(request):
    url_reports = []
    
    for url in urls:
        # Fetch the URL report
        report = fetch_virustotal_url_report(url)
        url_reports.append(report)
    
    return JsonResponse(url_reports, safe=False)
