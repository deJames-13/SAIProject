import vt

class VirusTotalService:
    def __init__(self, api_key):
        self.client = vt.Client(api_key)

    def get_file_report(self, file_hash):
        try:
            file_report = self.client.get_object(f"/files/{file_hash}")
            return file_report.to_dict()
        except vt.error.APIError as e:
            print(f"An error occurred: {e}")
            return None

    def get_url_report(self, url):
        try:
            url_id = vt.url_id(url)
            url_report = self.client.get_object(f"/urls/{url_id}")
            return url_report.to_dict()
        except vt.error.APIError as e:
            print(f"An error occurred: {e}")
            return None

    def scan_file(self, file_path):
        try:
            with open(file_path, "rb") as f:
                analysis = self.client.scan_file(f)
            return analysis.to_dict()
        except vt.error.APIError as e:
            print(f"An error occurred: {e}")
            return None

    def scan_url(self, url):
        try:
            analysis = self.client.scan_url(url)
            return analysis.to_dict()
        except vt.error.APIError as e:
            print(f"An error occurred: {e}")
            return None

    def close(self):
        self.client.close()