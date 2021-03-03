from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from sanity_check.settings import BASE_DIR
from django.views.decorators.csrf import csrf_exempt
import json
import os
import csv