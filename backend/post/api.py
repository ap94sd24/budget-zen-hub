from django.http import JsonResponse

from rest_framework.decorators import api_view, authentication_classes, permission_classes

from .serializers import PostSerializer
from .models import Post


# Create your views here.
@api_view(['GET'])
def post_list(request):
  posts = Post.objects.all()
  
  serializer = PostSerializer(posts, many=True)
  
  return JsonResponse({'data', serializer.data})