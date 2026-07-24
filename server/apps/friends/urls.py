from django.urls import path
from . import views

urlpatterns = [
    path('requests/', views.SendFriendRequestView.as_view(), name='send_friend_request'),
    path('request/<int:pk>/status/', views.UpdateFriendRequestView.as_view(), name='update_friend_request'),
    path('friendship/<int:friend_id>/', views.FriendshipDeleteAPIView.as_view(), name='friendship-delete'),
]