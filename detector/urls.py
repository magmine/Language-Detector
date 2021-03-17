from django.contrib import admin
from django.urls import path, include
from .views import LanguageResult

urlpatterns = [
    path("get_response/", LanguageResult.as_view()),
]