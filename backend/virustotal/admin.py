from django.contrib import admin
from .models import Analyses, ScanHistory, UrlReports, FileReports

# Register your models here.

@admin.register(Analyses)
class AnalysesAdmin(admin.ModelAdmin):
    list_display = ('scan_id', 'description', 'reputation', 'is_deleted')
    search_fields = ('scan_id', 'description')

@admin.register(ScanHistory)
class ScanHistoryAdmin(admin.ModelAdmin):
    list_display = ('title', 'scan_type', 'scan_date', 'is_deleted')
    search_fields = ('title',)

@admin.register(UrlReports)
class UrlReportsAdmin(admin.ModelAdmin):
    list_display = ('url', 'title', 'timestamp', 'is_deleted')
    search_fields = ('url', 'title')

@admin.register(FileReports)
class FileReportsAdmin(admin.ModelAdmin):
    list_display = ('file_name', 'timestamp', 'is_deleted')
    search_fields = ('file_name',)