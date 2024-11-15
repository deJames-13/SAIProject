from django.db import models

# Create your models here.

class ScanHistory(models.Model):
    id = models.AutoField(primary_key=True, editable=False, auto_created=True)
    scan_id = models.CharField(max_length=200)
    scan_type = models.CharField(max_length=200)
    scan_date = models.DateTimeField()
    permalink = models.TextField()
    title = models.TextField()
    message = models.TextField()
    scans = models.JSONField()
    sha256 = models.CharField(max_length=200)
    timestamp = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.scan_id
    

# Saved Urls model
class UrlReports(models.Model):
    id = models.AutoField(primary_key=True, editable=False, auto_created=True)
    url = models.TextField(unique=True)
    scan_id = models.CharField(max_length=200)
    title = models.TextField()
    description = models.TextField()
    reputation = models.TextField()
    votes = models.JSONField()
    times_submitted = models.IntegerField()
    last_analysis_stats = models.JSONField()
    timestamp = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.scan_id

# Saved Files model
class FileReports(models.Model):
    id = models.AutoField(primary_key=True, editable=False, auto_created=True)
    file = models.FileField(upload_to='uploads/')
    sha256 = models.CharField(max_length=200, unique=True)
    scan_id = models.CharField(max_length=200)
    name = models.TextField()
    description = models.TextField()
    reputation = models.TextField()
    votes = models.JSONField()
    times_submitted = models.IntegerField()
    last_analysis_stats = models.JSONField()
    timestamp = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.scan_id