from rest_framework import serializers
from .models import UrlReports

class UrlReportsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UrlReports
        fields = '__all__'        
        

