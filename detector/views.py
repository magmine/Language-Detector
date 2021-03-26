from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from language_detector.settings import BASE_DIR
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import os
import codecs
import dawg
import re


language_files = {
    'danish': os.path.join(BASE_DIR,"data/dansk.txt"),
    'german': os.path.join(BASE_DIR,"data/deutsch.txt"),
    'english': os.path.join(BASE_DIR,"data/english3.txt"),
    'spanish': os.path.join(BASE_DIR,"data/espanol.txt"),
    'frensh': os.path.join(BASE_DIR,"data/francais.txt"),
    'italian': os.path.join(BASE_DIR,"data/italiano.txt"),
    'dutch': os.path.join(BASE_DIR,"data/nederlands3.txt"),
    'norsk': os.path.join(BASE_DIR,"data/norsk.txt"),
    'swiss': os.path.join(BASE_DIR,"data/swiss.txt")
}

@method_decorator(csrf_exempt, name='dispatch')
class LanguageResult(APIView):
    def __init__(self):
        self.text : Text = None
        # self.text_english = """This is a test text predominantly written in english but has algo de spanish en el"""
        # self.text_spanish = """Esto es un texto de prueba predominantemente escrito en inglés pero tiene some english in it"""

    def post(self, request, format=None):
        request_data = {'text': request.data.get('text')}
        input_text = request_data['text']
        self.text = Text(input_text)
        stats = self.text.get_language_stats()
        stats['text'] = input_text
        return Response(stats, status=status.HTTP_200_OK) # Response returns a list

class Text:
    
    def __init__(self, text: str):
        self.text_processor = TextProcessor(text)
        self.language_stats = {}
    
    def get_language_stats(self):
        return self.text_processor.get_stats()

class TextProcessor:

    def __init__(self, text: str):
        self.text = text
        self.languages = Languages()

    def get_stats(self) -> {}:
        text_words = self.get_text_words()
        result = self.languages.get_occurances(text_words)
        result = sorted(result.items(), key=lambda item: item[1], reverse = True)
        return dict(result)

    def get_text_words(self) -> []:
        return re.findall(r"\w+", self.text)

class Languages:

    def __init__(self):
        self.languages_dawg = {}
        self.init_dawgs(language_files)
    
    def get_occurances(self, words: []) -> {}:
        result = {}
        for language, language_dawg in self.languages_dawg.items():
            result[language] = self.get_occurances_in_dawg(language_dawg, words)
        return result        

    def get_occurances_in_dawg(self, language_dawg, words) -> int:
        counter = 0
        for word in words:
            if language_dawg.has_key(word):
                counter += 1
        return counter

    def init_dawgs(self, language_files: {}):
        for language, file_path in language_files.items():
            self.languages_dawg[language] = dawg.DAWG(self.get_language_word_list(file_path))
    
    def get_language_word_list(self, file_path):
        return codecs.open(file_path, "r", "ISO-8859-1").read().split("\n")