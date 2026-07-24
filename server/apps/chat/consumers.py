from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
import json

class ConversationListConsumer(AsyncWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.user = None
        self.room_group_name = None

    async def connect(self):
        self.user = self.scope.get('user')
        if not self.user or not self.user.is_authenticated:
            await self.close()
            return

        self.room_group_name = f"user_{self.user.id}_conversations"
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        if self.room_group_name:
            await self.channel_layer.group_discard(
                self.room_group_name,
                self.channel_name
            )

    @sync_to_async
    def get_conversations(self):
        from .models import Conversation
        from .serializers import ConversationSerializer
        conversations = Conversation.objects.filter(users=self.user).prefetch_related('users')
        serializer = ConversationSerializer(conversations, many=True)
        return serializer.data

    async def receive(self, text_data):
        data = json.loads(text_data)
        action = data.get('action')

        if action == 'fetch_conversations':
            conversations = await self.get_conversations()
            await self.send(text_data=json.dumps({
                'conversations': conversations
            }))

    async def conversation_update(self, event):
        """Send updated conversation list to client."""
        await self.send(text_data=json.dumps({
            'conversations': event['conversations']
        }))

class ChatConsumer(AsyncWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.conversation_id = None
        self.room_group_name = None
        self.user = None

    async def connect(self):
        self.user = self.scope.get('user')
        if not self.user or not self.user.is_authenticated:
            await self.close()
            return

        self.conversation_id = self.scope['url_route']['kwargs']['conversation_id']
        try:
            from .models import Conversation
            conversation = await Conversation.objects.aget(id=self.conversation_id)
            if not await conversation.users.filter(id=self.user.id).aexists():
                await self.close()
                return
        except Conversation.DoesNotExist:
            await self.close()
            return

        self.room_group_name = f'chat_{self.conversation_id}'
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

        await self.send_message_history()

    async def disconnect(self, code):
        if self.room_group_name:
            await self.channel_layer.group_discard(
                self.room_group_name,
                self.channel_name
            )

    async def receive(self, text_data=None, bytes_data=None):
        data = json.loads(text_data)
        action = data.get('action')

        if action == 'fetch_messages':
            await self.send_message_history()
            return

        message_text = data.get('message', '').strip()
        if not message_text:
            return

        try:
            from .models import Conversation, Message
            conversation = await Conversation.objects.aget(id=self.conversation_id)
            message = await Message.objects.acreate(
                conversation=conversation,
                sender=self.user,
                content=message_text
            )
        except Conversation.DoesNotExist:
            await self.send(text_data=json.dumps({'error': 'Conversation not found'}))
            return
        except Exception as e:
            await self.send(text_data=json.dumps({'error': str(e)}))
            return

        from .serializers import MessageSerializer
        serializer = MessageSerializer(message)
        message_data = await sync_to_async(lambda: serializer.data)()

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message_data': message_data,
            }
        )

    async def send_message_history(self):
        from .models import Message
        from .serializers import MessageSerializer
        messages = Message.objects.filter(conversation_id=self.conversation_id).order_by('timestamp')
        data = await sync_to_async(lambda: MessageSerializer(messages, many=True).data)()
        await self.send(text_data=json.dumps(data))

    async def chat_message(self, event):
        """Forward the serialized message to the WebSocket."""
        await self.send(text_data=json.dumps(event['message_data']))