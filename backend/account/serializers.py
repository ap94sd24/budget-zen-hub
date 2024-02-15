from rest_framework import serializers

from .models import User, FollowerRequest

class UserSerializer(serializers.ModelSerializer):
  class Meta: 
    model = User
    fields = ('id', 'name', 'email',)
    

class FollowerRequestSerializer(serializers.ModelSerializer):
  created_by = UserSerializer(read_only=True)
  class Meta: 
    model = FollowerRequest
    fields = ('id', 'created_by',)
    