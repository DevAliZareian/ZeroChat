from django.urls import path
from . import views

urlpatterns = [
    path('conversation/', views.CreateConversationView.as_view(), name='create-conversation'),
    path('conversation/<int:conversation_id>/messages/', views.ListMessagesView.as_view(), name='get-conversation-messages'),
]