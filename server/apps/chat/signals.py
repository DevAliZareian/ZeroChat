from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from .models import Conversation, Message
from .serializers import ConversationSerializer

def send_conversation_update(user_ids):
    channel_layer = get_channel_layer()
    if not channel_layer:
        return
    for user_id in user_ids:
        conversations = Conversation.objects.filter(users__id=user_id).prefetch_related('users')
        serializer = ConversationSerializer(conversations, many=True)
        async_to_sync(channel_layer.group_send)(
            f"user_{user_id}_conversations",
            {
                'type': 'conversation_update',
                'conversations': serializer.data
            }
        )

@receiver(post_save, sender=Conversation)
def conversation_created_or_updated(sender, instance, created, **kwargs):
    user_ids = instance.users.values_list('id', flat=True)
    send_conversation_update(user_ids)

@receiver(post_save, sender=Message)
def message_created(sender, instance, created, **kwargs):
    if created:
        user_ids = instance.conversation.users.values_list('id', flat=True)
        send_conversation_update(user_ids)

@receiver(post_delete, sender=Conversation)
def conversation_deleted(sender, instance, **kwargs):
    user_ids = instance.users.values_list('id', flat=True)
    send_conversation_update(user_ids)