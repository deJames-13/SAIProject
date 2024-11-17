from django.urls import path, include
from rest_framework.routers import DefaultRouter
from virustotal.views import MetaDataViewSet

router = DefaultRouter()
router.register(r'metadata', MetaDataViewSet, basename='metadata')

urlpatterns = [
    path('/', include(router.urls)),
]