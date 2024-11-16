from rest_framework import serializers
from .models import UrlReports, FileReports, Analyses, ScanHistory
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class AnalysesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Analyses
        fields = '__all__'

class ScanHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ScanHistory
        fields = '__all__'
    

class UrlReportsSerializer(serializers.ModelSerializer):
    analysis = AnalysesSerializer()

    class Meta:
        model = UrlReports
        fields = '__all__'

    def create(self, validated_data):
        analysis_data = validated_data.pop('analysis')
        analysis = Analyses.objects.create(**analysis_data)
        user = validated_data.pop('user')
        url_report = UrlReports.objects.create(analysis=analysis, user=user, **validated_data)
        return url_report

class FileReportsSerializer(serializers.ModelSerializer):
    # file = serializers.FileField()
    analysis = AnalysesSerializer()

    class Meta:
        model = FileReports
        fields = '__all__'

    def create(self, validated_data):
        analysis_data = validated_data.pop('analysis')
        analysis = Analyses.objects.create(**analysis_data)
        user = validated_data.pop('user')
        file_report = FileReports.objects.create(analysis=analysis, user=user, **validated_data)
        return file_report

class UploadSerializer(serializers.Serializer):
    file = serializers.FileField()

    class Meta:
        fields = ['file']