from django.http import JsonResponse

from rest_framework.decorators import api_view, authentication_classes, permission_classes

from .forms import SignupForm
from .models import User, FollowerRequest
from .serializers import UserSerializer, FollowerRequestSerializer


@api_view(['GET'])
def me(request): 
  return JsonResponse({
    'id': request.user.id,
    'name': request.user.name,
    'email': request.user.email
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
    form.save()
    
  #TODO: add sent email verification
  else:
    message = 'error'
    
  return JsonResponse({'status': message})

@api_view(['GET'])
def followers(request, pk):
  user = User.objects.get(pk=pk)
  requests = []
  
  if user == request.user:
    requests = FollowerRequest.objects.filter(created_for=request.user)
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
  
  follower_request = FollowerRequest.objects.create(created_for=user, created_by=request.user)
  
  return JsonResponse({'message': 'Follower added!'})