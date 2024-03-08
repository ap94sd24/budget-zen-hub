from django.http import JsonResponse

from rest_framework.decorators import api_view, authentication_classes, permission_classes

from account.models import User
from .models import Post, Like, Comment, Trend

from account.serializers import UserSerializer
from .serializers import PostSerializer, PostDetailSerializer, CommentSerializer, TrendSerializer

from .forms import PostForm, AttachmentForm

from notification.utils import create_notification


# Create your views here.
@api_view(['GET'])
def post_list(request):
  user_ids = [request.user.id]
  
  for user in request.user.followers.all():
      user_ids.append(user.id)
      
  posts = Post.objects.filter(created_by_id__in=list(user_ids))
  
  trend = request.GET.get('trend', '')
  
  if trend: 
    posts = posts.filter(body__icontains='#'+trend)
  
  serializer = PostSerializer(posts, many=True)
  
  return JsonResponse(serializer.data, safe=False)

@api_view(['GET'])
def post_list_profile(request, pk):
  user = User.objects.get(pk=pk)
  posts = Post.objects.filter(created_by_id=pk)
  
  
  
  posts_serializer = PostSerializer(posts, many=True)
  user_serializer = UserSerializer(user)
  
  return JsonResponse({
    'posts': posts_serializer.data, 
    'user': user_serializer.data
  }, safe=False)

@api_view(['POST'])
def post_create(request):
  form = PostForm(request.POST)
  attachment = None
  print(request.POST)
  print(request.FILES)
  attachment_form = AttachmentForm(request.POST, request.FILES)
  
  if attachment_form.is_valid():
    attachment = attachment_form.save(commit=False)
    attachment.created_by = request.user
    attachment.save()
  
  if form.is_valid():
    post = form.save(commit=False)
    post.created_by = request.user
    post.save()
    
    if attachment:
      post.attachments.add(attachment)
    
    
    user = request.user
    user.posts_count = user.posts_count + 1
    user.save()
    
    serializer = PostSerializer(post)
    
    return JsonResponse(serializer.data,safe=False)
  
  else:
    return JsonResponse({'error': 'Error here!'})
  
  
@api_view(['POST'])
def post_like(request, pk):
  post = Post.objects.get(pk=pk)
  
  if not post.likes.filter(created_by=request.user):
    like = Like.objects.create(created_by=request.user)
    
    post = Post.objects.get(pk=pk)
    post.likes_count = post.likes_count + 1
    post.likes.add(like)
    post.save()
    
    notification =  create_notification(request, 'post_like', post_id=post.id)
  
    return JsonResponse({'message': 'like created'})
  else:
    return JsonResponse({'message': 'Post already liked!'})
  
@api_view(['GET'])
def post_detail(request, pk):
  post = Post.objects.get(pk=pk)
  
  return JsonResponse({
    'post': PostDetailSerializer(post).data
  })
  
@api_view(['POST'])
def post_create_comment(request, pk):
  comment = Comment.objects.create(body=request.data.get('body'), created_by=request.user)
  
  post = Post.objects.get(pk=pk)
  post.comments.add(comment)
  post.comments_count += 1
  post.save()
  
  notification =  create_notification(request, 'post_comment', post_id=post.id)
  
  serializer = CommentSerializer(comment)
  
  return JsonResponse(serializer.data, safe=False)

@api_view(['GET'])
def get_trends(request):
  serializer = TrendSerializer(Trend.objects.all(), many=True)
  
  return JsonResponse(serializer.data, safe=False)
  