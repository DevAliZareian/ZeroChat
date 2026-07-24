# apps/chat/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.db import models
from .models import Conversation, Message
from .serializers import ConversationSerializer, MessageSerializer

class CreateConversationView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user_ids = set(request.data.get('users', []))
        if not user_ids:
            return Response({'error': 'users field required'}, status=status.HTTP_400_BAD_REQUEST)

        user_ids.add(request.user.id)
        users = list(user_ids)

        existing = Conversation.objects.annotate(
            user_count=models.Count('users')
        ).filter(user_count=len(users))
        for user_id in users:
            existing = existing.filter(users__id=user_id)

        existing = existing.first()
        if existing:
            serializer = ConversationSerializer(existing)
            return Response(serializer.data, status=status.HTTP_200_OK)

        name = request.data.get('name', '').strip()
        if not name:
            from django.contrib.auth import get_user_model
            User = get_user_model()
            other_users = User.objects.filter(id__in=user_ids).exclude(id=request.user.id)
            name = ', '.join([u.email for u in other_users])

        conversation = Conversation.objects.create(name=name)
        conversation.users.set(users)
        conversation.save()

        serializer = ConversationSerializer(conversation)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class ListMessagesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, conversation_id):
        try:
            conversation = Conversation.objects.get(id=conversation_id, users=request.user)
        except Conversation.DoesNotExist:
            return Response({'error': 'Conversation not found'}, status=status.HTTP_404_NOT_FOUND)

        messages = Message.objects.filter(conversation=conversation).order_by('timestamp')  # ascending
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)