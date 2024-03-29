from django.conf import settings
from django.http import JsonResponse
from django.contrib.auth.forms import PasswordChangeForm
from django.core.mail import send_mail

from rest_framework.decorators import api_view, authentication_classes, permission_classes

from notification.utils import create_notification
from .forms import SignupForm, ProfileForm
from .models import User, FollowerRequest
from .serializers import UserSerializer, FollowerRequestSerializer


@api_view(['GET'])
def me(request): 
  return JsonResponse({
    'id': request.user.id,
    'name': request.user.name,
    'email': request.user.email,
    'avatar': request.user.get_avatar()
  })

@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def signup(request):
  data = request.data
  message = 'success'
    
  form = SignupForm({
    'email': data.get('email'),
    'name': data.get('name'),
    'password1': data.get('password1'),
    'password2': data.get('password2')
  })
  
  if form.is_valid():
    user = form.save()
    user.is_active = False
    user.save()
    
    url = f'{settings.WEBSITE_URL}/activateemail/?email={user.email}&id={user.id}'
    
    send_mail(
      'Please verify your email',
      f'The url for activating your account is: {url}',
      'adampan94@gmail.com',
      [user.email],
      fail_silently=False,
    )
    
  #TODO: add sent email verification
  else:
    message = form.errors.as_json()
    
  return JsonResponse({'message': message}, safe=False)

@api_view(['GET'])
def followers(request, pk):
  user = User.objects.get(pk=pk)
  requests = []
  
  
  
  if user == request.user:
    requests = FollowerRequest.objects.filter(created_for=request.user, status=FollowerRequest.SENT)
    requests = FollowerRequestSerializer(requests, many=True)
    requests = requests.data
  followers = user.followers.all()
  
  return JsonResponse({
      'user': UserSerializer(user).data,
      'followers': UserSerializer(followers, many=True).data,
      'requests': requests
    }, safe=False)

@api_view(['POST'])
def send_follower_request(request, pk): 
  user = User.objects.get(pk=pk)
  
  followerReqMade = FollowerRequest.objects.filter(created_for=request.user).filter(created_by=user)
  alreadyAFollower = FollowerRequest.objects.filter(created_for=user).filter(created_by=request.user)
  
  if not followerReqMade or not alreadyAFollower:
    followerrequest = FollowerRequest.objects.create(created_for=user, created_by=request.user)
    
    notification =  create_notification(request, 'new_followerrequest', followerrequest_id=followerrequest.id)
  
    return JsonResponse({'message': 'Follower added!'})
  else: 
    return JsonResponse({'message': 'request already made!'})

@api_view(['POST'])
def handle_request(request, pk, status):
  user = User.objects.get(pk=pk)
  follower_request = FollowerRequest.objects.filter(created_for=request.user).get(created_by=user)
  follower_request.status = status
  follower_request.save()
  
  user.followers.add(request.user)
  user.followers_count = user.followers_count + 1
  user.save()
  
  request_user = request.user
  request_user.followers_count = request_user.followers_count + 1
  request_user.save()
  
  notification =  create_notification(request, 'accepted_followerrequest', followerrequest_id=follower_request.id)
  
  return JsonResponse({'message': 'Follower updated!'})


@api_view(['POST'])
def edit_profile(request):
  user = request.user
  email=request.data.get('email')
  
  if User.objects.exclude(id=user.id).filter(email=email).exists():
    return JsonResponse({'message': 'Email already exists!'})
  else:
    form = ProfileForm(request.POST, request.FILES, instance=user)

    if form.is_valid():
      form.save()
      
    serializer = UserSerializer(user)
    
    return JsonResponse({'message': 'Information updated!', 'user': serializer.data})
  
@api_view(['POST'])
def edit_password(request):
  user = request.user
  form = PasswordChangeForm(data=request.POST, user=user)
  
  if form.is_valid():
    form.save()
    
    return JsonResponse({'message': 'success'})
  
  else: 
    return JsonResponse({'message': form.errors.as_json()}, safe=False)
    
@api_view(['GET'])
def my_suggested_followers(request):
  serializer = UserSerializer(request.user.people_you_may_know.all(), many=True)
  
  return JsonResponse(serializer.data, safe=False)
  
  