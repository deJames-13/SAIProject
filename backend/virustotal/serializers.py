from rest_framework import serializers
from .models import UrlReports

class UrlReportsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UrlReports
        fields = ['url', 'scan_id', 'title', 'description', 'reputation', 'votes', 'times_submitted', 'last_analysis_stats']
        
        

