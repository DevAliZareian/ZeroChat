from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
from django.db import models
import json

class FriendListConsumer(AsyncWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.user = None
        self.room_group_name = None

    async def connect(self):
        user = self.scope.get('user')
        if not user or not user.is_authenticated:
            await self.close()
            return

        self.user = user
        self.room_group_name = f"user_{user.id}_friends"

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    @sync_to_async(thread_sensitive=False)
    def fetch_friends(self, user):
        from apps.friends.models import Friendship
        friends = Friendship.objects.filter(user=user).select_related('friend')
        return [{'id': f.friend.id, 'email': f.friend.email} for f in friends]

    async def receive(self, text_data):
        try:
            data = json.loads(text_data)
        except json.JSONDecodeError:
            await self.send(text_data=json.dumps({'error': 'Invalid JSON'}))
            return

        action = data.get('action')
        if action == 'fetch_friends':
            try:
                friends = await self.fetch_friends(self.user)
                await self.send(text_data=json.dumps({'friends': friends}))
            except Exception as e:
                await self.send(text_data=json.dumps({'error': 'Could not fetch friends'}))
        else:
            await self.send(text_data=json.dumps({'error': f'Unknown action: {action}'}))

    async def friends_update(self, event):
        await self.send(text_data=json.dumps({'friends': event['friends']}))

class FriendRequestConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        user = self.scope.get('user')

        if not user or not user.is_authenticated:
            await self.close()
            return

        self.user = user
        self.room_group_name = f"user_{user.id}_friend_requests"

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    @sync_to_async(thread_sensitive=False)
    def fetch_friend_requests(self, user):
        from apps.friends.models import FriendRequest
        friend_requests = FriendRequest.objects.filter(models.Q(sender=user) | models.Q(receiver=user))
        serialized_data = []
        for request in friend_requests:
            serialized_request = {
                'id': request.id,
                'sender': request.sender.email,
                'receiver': request.receiver.email,
                'status': request.status,
                'created_at': request.created_at.isoformat(),
            }
            serialized_data.append(serialized_request)
        return serialized_data

    async def receive(self, text_data):
        user = self.user
        data = json.loads(text_data)

        if data.get("action") == "fetch_friend_requests":
            try:
                friend_requests_list = await self.fetch_friend_requests(user)

                await self.send(text_data=json.dumps({
                    'friend_requests': friend_requests_list
                }))

            except Exception as e:
                print(f"Error fetching friend requests: {e}")
                await self.send(text_data=json.dumps({
                    'error': 'Could not fetch friend requests'
                }))

    async def friend_request_update(self, event):
        friend_request_data = event.get('friend_request')
        if friend_request_data:
            await self.send(text_data=json.dumps({
                'friend_request': friend_request_data
            }))
