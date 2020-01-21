from django.shortcuts import render
from django.http import HttpResponse
from mtcnn import MTCNN
from cv2 import cv2

# Create your views here.

def home(request):
    return HttpResponse("<h2>HTTP 401</h2>")

#↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
def recognise(request):

    photo_url=request.GET.get('url')

    #print("URL is: ")
    #print(photo_url)

    img = cv2.cvtColor(cv2.imread(photo_url), cv2.COLOR_BGR2RGB)
    detector = MTCNN()
    return HttpResponse(detector.detect_faces(img))