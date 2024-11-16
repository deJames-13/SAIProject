from rest_framework import serializers
from .models import UrlReports, FileReports, Analyses, ScanHistory

class AnalysesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Analyses
        fields = '__all__'

class ScanHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ScanHistory
        fields = '__all__'
        

class UrlReportsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UrlReports
        fields = '__all__'        
        
class FileReportsSerializer(serializers.ModelSerializer):
    file = serializers.FileField()
    class Meta:
        model = FileReports
        fields = '__all__'


class UploadSerializer(serializers.Serializer):
    file = serializers.FileField()
    
    class Meta:
        fields = ['file']
