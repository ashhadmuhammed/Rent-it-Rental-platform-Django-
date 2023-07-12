from django.shortcuts import redirect, render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate,login,logout
from Loginsys import settings
from django.core.mail import send_mail
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode,urlsafe_base64_decode
from django.utils.encoding import force_bytes,force_str
from .tokens import generate_token
from django.core.mail import EmailMessage
from django.http import JsonResponse

def home(request):
     return render(request,"authentication/index.html")
def signup(request):

    if request.method=="POST":
        username=request.POST['username']
        email=request.POST['email']
        pass1=request.POST['pass1']
        pass2=request.POST['pass2']
        fname=request.POST['fname']
        lname=request.POST['lname']
        
        if User.objects.filter(username=username):
            messages.error(request,"Username already exist!")
            return redirect('home')
        if User.objects.filter(email=email):
            messages.error(request,"Email already registered!")
            return redirect('home')
        if(pass1!=pass2):
            messages.error(request,"Password are not match")
        
        
        
        myuser =User.objects.create_user(username,email,pass1)
        myuser.first_name=fname
        myuser.last_name=lname
        myuser.is_active=False
        myuser.save()
        messages.success(request,"Your Account successfully created ,we have send you a confirmation link")

        #welcomme Email

        subject="Welcome to our team"
        msg="Hello"+myuser.first_name+"you are welcome"+"\n we have also send you a confirmation mail"
        from_email=settings.EMAIL_HOST_USER
        to_list=[myuser.email]
        send_mail(subject,msg,from_email,to_list,fail_silently=True)


        #Email address confirmation part

        current_site=get_current_site(request)
        subject2="confirm your email"
        msg_link=render_to_string('email_confirmation.html',{
            'name':myuser.first_name,
            'domain':current_site.domain,
             'uid':urlsafe_base64_encode(force_bytes(myuser.pk)),
             'token':generate_token.make_token(myuser),
        })
        email=EmailMessage(
            subject2,
            msg_link,
            settings.EMAIL_HOST_USER,
            [myuser.email],
        )

        email.fail_silently=True
        email.send()


        return redirect('signin')
       
            
    return render(request,"authentication/signup.html")


def signin(request):

    if request.method=="POST":
        username=request.POST['username'] 
        pass1=request.POST['pass1']

        user=authenticate(username=username,password=pass1)
        if user is not None:
            login(request,user)
            fname=user.first_name
            return render(request,"authentication/index.html",{'fname':fname})

        else:
            messages.error(request,"Bad credentials")
            return redirect ('home')
    
    return render(request,"authentication/signin.html")
def signout(request):
    logout(request)
    messages.success(request,"Logout success")
    return redirect('home')

def activate(request,uidb64,token):
    try:
        uid=force_str(urlsafe_base64_decode(uidb64))
        myuser=User.objects.get(pk=uid)

    except(TypeError,ValueError,OverflowError,User.DoesNotExist):
        myuser=None
        
    if myuser is not None and generate_token.check_token(myuser,token):
        myuser.is_active=True
        myuser.save()
        login(request,myuser)
        return redirect('home')
    else:
        return render(request,'activation_failed.html')
    
