from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

from .models import Friendship, FriendRequest

@receiver(post_save, sender=Friendship)
def friendship_created(sender, instance, created, **kwargs):
    if not created:
        return
    channel_layer = get_channel_layer()
    if not channel_layer:
        return

    friends = Friendship.objects.filter(user=instance.user).select_related('friend')
    serialized = [{'id': f.friend.id, 'email': f.friend.email} for f in friends]
    async_to_sync(channel_layer.group_send)(
        f"user_{instance.user.id}_friends",
        {'type': 'friends_update', 'friends': serialized}
    )

@receiver(post_delete, sender=Friendship)
def friendship_deleted(sender, instance, **kwargs):
    channel_layer = get_channel_layer()
    if not channel_layer:
        return

    for user in (instance.user, instance.friend):
        friends = Friendship.objects.filter(user=user).select_related('friend')
        serialized = [{'id': f.friend.id, 'email': f.friend.email} for f in friends]
        async_to_sync(channel_layer.group_send)(
            f"user_{user.id}_friends",
            {'type': 'friends_update', 'friends': serialized}
        )

@receiver(post_save, sender=FriendRequest)
def friend_request_created(sender, instance, created, **kwargs):
    if created:
        serialized_request = {
            'id': instance.id,
            'sender': instance.sender.email,
            'receiver': instance.receiver.email,
            'status': instance.status,
            'created_at': instance.created_at.isoformat(),
        }

        channel_layer = get_channel_layer()
        if channel_layer:
            group_name = f'user_{instance.sender.id}_friend_requests'
            async_to_sync(channel_layer.group_send)(
                group_name,
                {
                    'type': 'friend_request_update',
                    'friend_request': serialized_request
                }
            )

            receiver_group_name = f'user_{instance.receiver.id}_friend_requests'
            async_to_sync(channel_layer.group_send)(
                receiver_group_name,
                {
                    'type': 'friend_request_update',
                    'friend_request': serialized_request
                }
            )

@receiver(post_save, sender=FriendRequest)
def friend_request_status_changed(sender, instance, created=False, **kwargs):
    channel_layer = get_channel_layer()
    if not channel_layer:
        return

    serialized_request = {
        'id': instance.id,
        'sender': instance.sender.email,
        'receiver': instance.receiver.email,
        'status': instance.status,
        'created_at': instance.created_at.isoformat(),
    }

    if not created:
        update_fields = kwargs.get('update_fields')

        if update_fields is None or 'status' in update_fields:
            async_to_sync(channel_layer.group_send)(
                f'user_{instance.sender.id}_friend_requests',
                {
                    'type': 'friend_request_update',
                    'friend_request': serialized_request
                }
            )

            async_to_sync(channel_layer.group_send)(
                f'user_{instance.receiver.id}_friend_requests',
                {
                    'type': 'friend_request_update',
                    'friend_request': serialized_request
                }
            )