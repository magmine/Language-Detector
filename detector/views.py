from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from language_detector.settings import BASE_DIR
from django.views.decorators.csrf import csrf_exempt
import json
import os
import csv
import codecs
import dawg
import re

'''
read the files one by one a
'''

# TODO: make the view a class to be able to reuse dawg and other data


# TODO: put the name files in a dictionary or something that we can iterate over
#
# dansk_file = os.path.join(BASE_DIR,"data/dansk.txt")
# deutsch_file = os.path.join(BASE_DIR,"data/deutsch.txt")
english_file = os.path.join(BASE_DIR,"data/english3.txt")
espanol_file = os.path.join(BASE_DIR,"data/espanol.txt")
# francais_file = os.path.join(BASE_DIR,"data/francais.txt")
# italiano_file = os.path.join(BASE_DIR,"data/italiano.txt")
# nederlands_file = os.path.join(BASE_DIR,"data/nederlands3.txt")
# norsk_file = os.path.join(BASE_DIR,"data/norsk.txt")
# swiss_file = os.path.join(BASE_DIR,"data/swiss.txt")


'''
First I will have a hardcoded text/s that will be processed and send the result as a Json response
'''

english_dawg = dawg.DAWG(codecs.openend(english_file, "r", "utf-8").read().split("\n"))
espanol_dawg = dawg.DAWG(codecs.open(espanol_file, "r", "utf-8").read().split("\n"))

text_english = """This is a test text predominantly written in english but has algo de spanish en el"""
text_spanish = """Esto es un texto de prueba predominantemente escrito en inglés pero tiene some english in it"""


@api_view(['GET'])
@csrf_exempt
def get_response(request):
    data = {}

    english_file = os.path.join(BASE_DIR,"data/english3.txt")
    espanol_file = os.path.join(BASE_DIR,"data/espanol.txt")

    english_dawg = dawg.DAWG(codecs.openend(english_file, "r", "utf-8").read().split("\n"))
    espanol_dawg = dawg.DAWG(codecs.open(espanol_file, "r", "utf-8").read().split("\n"))

    text_english = """This is a test text predominantly written in english but has algo de spanish en el"""
    text_spanish = """Esto es un texto de prueba predominantemente escrito en inglés pero tiene some english in it"""

    if request.method == 'GET':
        data = process_text(english_text)

    return Response(data, status=status.HTTP_200_OK)

def process_text(text):
    text_words = get_text_words(text)
    number_of_english_words = count_occurances_dawg(text_words, english_dawg)
    number_of_spanish_words = count_occurances_dawg(text_words, spanish_dawg)

    if number_of_english_words > number_of_spanish_words:
        return "{ 'language': 'The predominant language is english' }"
    else
        return "{ 'language': 'The predominant language is spanish' }"

def count_occurances_dawg(words, language_dawg):
    counter = 0
    for word in words:
        if language_dawg.has_key(word):
            counter = counter + 1;
    return counter;

def get_text_words(text):
    return re.findall(r"\w+", text);