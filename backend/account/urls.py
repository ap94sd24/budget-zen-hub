from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from . import api

urlpatterns = [
  path('me/', api.me, name='me'),
  path('signup/', api.signup, name='signup'),
  path('login/', TokenObtainPairView.as_view(), name='token_obtain'),
  path('refresh/', TokenRefreshView.as_view(), name='token-refresh'),
  path('followers/<uuid:pk>/request/', api.send_follower_request, name='send_follower_request'),
  path('followers/<uuid:pk>/', api.followers, name='followers'),
  path('followers/<uuid:pk>/<str:status>/', api.handle_request, name='handle_request'),
]