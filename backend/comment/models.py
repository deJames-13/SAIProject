from django.db import models

# Create your models here.
class Comments(models.Model):
    id = models.AutoField(primary_key=True, editable=False, auto_created=True)
    scan_id = models.CharField(max_length=200)
    comment = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.scan_id