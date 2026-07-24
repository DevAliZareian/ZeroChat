# apps/chat/serializers.py
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Conversation, Message

User = get_user_model()

class UserMinimalSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email']

class MessageSerializer(serializers.ModelSerializer):
    sender = UserMinimalSerializer(read_only=True)

    class Meta:
        model = Message
        fields = ['id', 'conversation', 'sender', 'content', 'timestamp']
        read_only_fields = ['id', 'timestamp', 'sender']

class ConversationSerializer(serializers.ModelSerializer):
    users = UserMinimalSerializer(many=True, read_only=True)
    last_message = serializers.SerializerMethodField()

    class Meta:
        model = Conversation
        fields = ['id', 'name', 'users', 'created_at', 'last_message']
        read_only_fields = ['created_at', 'last_message']

    def get_last_message(self, obj):
        last_msg = obj.messages.order_by('-timestamp').first()
        if last_msg:
            return MessageSerializer(last_msg).data
        return None