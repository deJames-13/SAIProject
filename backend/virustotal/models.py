from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class SoftDeleteModel(models.Model):
    is_deleted = models.BooleanField(default=False)  
    deleted_at = models.DateTimeField(null=True, blank=True) 

    class Meta:
        abstract = True 

    def delete(self, using=None, keep_parents=False):
        self.is_deleted = True
        self.deleted_at = timezone.now()
        self.save()

    def restore(self):
        self.is_deleted = False
        self.deleted_at = None
        self.save()
    
    def hard_delete(self):
        super().delete()
        
class SoftDeleteManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_deleted=False)

    def all_with_deleted(self):
        return super().get_queryset()

    def deleted_only(self):
        return super().get_queryset().filter(is_deleted=True)

class Analyses(SoftDeleteModel):
    id = models.AutoField(primary_key=True, editable=False, auto_created=True)
    scan_id = models.TextField()
    description = models.TextField(default="", blank=True)
    reputation = models.TextField()
    votes = models.JSONField()
    times_submitted = models.IntegerField()
    last_analysis_stats = models.JSONField()
    
    objects = SoftDeleteManager()

    def __str__(self):
        return self.scan_id

# Scan History model for all scans done by user
class ScanHistory(SoftDeleteModel):
    id = models.AutoField(primary_key=True, editable=False, auto_created=True)
    title = models.TextField()
    message = models.TextField()
    scan_type = models.CharField(max_length=200)
    scan_date = models.DateTimeField()
    scan_stats = models.JSONField()
    scan_votes = models.JSONField()
    permalink = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    
    # Relationship 
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    objects = SoftDeleteManager()
    
    def __str__(self):
        return self.title

    class Meta:
        indexes = [
            models.Index(fields=['scan_type']), 
            models.Index(fields=['title']), 
            models.Index(fields=['timestamp']), 
        ]

# Saved Urls model by user
class UrlReports(SoftDeleteModel):
    id = models.AutoField(primary_key=True, editable=False, auto_created=True)
    title = models.TextField()
    url = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    
    # Relationship 
    analysis = models.ForeignKey(Analyses, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    objects = SoftDeleteManager()

    def __str__(self):
        return self.title
    
    class Meta:
        indexes = [
            models.Index(fields=['url']), 
            models.Index(fields=['timestamp']),  
        ]

# Saved Files model 
class FileReports(SoftDeleteModel):
    id = models.AutoField(primary_key=True, editable=False, auto_created=True)
    file_name = models.TextField()
    file_type = models.TextField()
    hashes = models.JSONField()
    timestamp = models.DateTimeField(auto_now_add=True)
    
    # Relationship 
    analysis = models.ForeignKey(Analyses, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    objects = SoftDeleteManager()

    def __str__(self):
        return self.file_name
    
    class Meta:
        indexes = [
            models.Index(fields=['file_name']),  
            models.Index(fields=['file_type']),  
            models.Index(fields=['timestamp']),  
        ]