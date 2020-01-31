from django.shortcuts import render
from django.http import HttpResponse
from mtcnn import MTCNN
from cv2 import cv2
import pyrebase

firebaseConfig = {
    'apiKey': "AIzaSyD7H6ZxUcR0M9acTTrg7cyV0Dxu4C27cUU",
    'authDomain': "security-sgp.firebaseapp.com",
    'databaseURL': "https://security-sgp.firebaseio.com",
    'projectId': "security-sgp",
    'storageBucket': "security-sgp.appspot.com",
    'messagingSenderId': "193607441095",
    'appId': "1:193607441095:web:5d06e1014f9c33917efce2",
    'measurementId': "G-EZK89HXM88"
  }

firebase=pyrebase.initialize_app(firebaseConfig)
auth=firebase.auth()
db=firebase.database()
user = auth.sign_in_with_email_and_password('17ce038@charusat.edu.in', 'Your Password')
print("Credentials: ")
authToken=auth.current_user.get('localId')
print(authToken)
print('------------')
# Create your views here.

def home(request):
    return render(request,'home.html')

#↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
def recognise(request):

    photo_url=request.GET.get('url')

    #print("URL is: ")
    #print(photo_url)

    img = cv2.cvtColor(cv2.imread(photo_url), cv2.COLOR_BGR2RGB)
    detector = MTCNN()
    return HttpResponse(detector.detect_faces(img))


def addPerson(request):
    if request.method=='POST':
        fname=request.POST['fname']
        lname=request.POST['lname']
        mno=request.POST['mno']
        intime=request.POST['intime']
        outtime=request.POST['outtime']
        data={
            'first name':fname,
            'last name':lname,
            'mobile no':mno,
            'intime':intime,
            'outtime':outtime,
        }
        print(fname)
        print(lname)
        print(mno)
        db.child('dummy').child('authenticated').child(authToken).set(data)

    return HttpResponse("<h1>form submitted</h1>")
    

