from django.contrib import admin
from django.urls import path, include
from detector.views import index

urlpatterns = [
    path('', index, name='index'),
    path("api/", include('detector.urls')),
]
