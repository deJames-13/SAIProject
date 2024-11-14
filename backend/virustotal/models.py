from django.db import models

# Create your models here.

# Reports
# class Report(models.Model):
#     id = models.CharField(max_length=200)
#     status = models.CharField(max_length=200)
#     results = models.JSONField()
#     harmless = models.IntegerField()
#     malicious = models.IntegerField()
#     suspicious = models.IntegerField()
#     undetected = models.IntegerField()
#     timeout = models.IntegerField()
#     date = models.DateTimeField()
#     url = models.URLField()

#     def __str__(self):
#         return
    
# Historical Reports
# class HistoricalReport(models.Model):
#     id = models.CharField(max_length=200)
#     harmless = models.IntegerField()
#     malicious = models.IntegerField()
#     suspicious = models.IntegerField()
#     undetected = models.IntegerField()
#     timeout = models.IntegerField()
#     url = models.URLField()
#     analyses_url = models.URLField()
#     date = models.DateTimeField()
#     timestamp = models.DateTimeField(auto_now_add=True)
    
#     def __str__(self):
#         return
    
    
    
