from rest_framework import serializers
from django.contrib.auth import get_user_model

from apps.friends.models import FriendRequest

User = get_user_model()
class FriendRequestSerializer(serializers.ModelSerializer):
    receiver = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = FriendRequest
        fields = ['receiver']

    def create(self, validated_data):
        sender_id = self.context['request'].user
        receiver_id = validated_data['receiver']
        return FriendRequest.objects.create(sender=sender_id, receiver=receiver_id)

class UpdateFriendRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendRequest
        fields = ['status']