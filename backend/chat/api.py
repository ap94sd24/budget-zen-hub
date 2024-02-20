from django.http import JsonResponse

from rest_framework.decorators import api_view, authentication_classes, permission_classes

from .serializers import ConversationSerializer, ConversationDetailSerializer, ConversationMessageSerializer

from .models import Conversation, ConversationMessage

@api_view(['GET'])
def conversation_list(request):
  conversations = Conversation.objects.filter(users__in=list([request.user]))
  
  serializer = ConversationSerializer(conversations, many=True)
  
  
  
  print(conversations)
  
  return JsonResponse(serializer.data, safe=False)
    
  
    


