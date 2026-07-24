from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path('ws/friends/', consumers.FriendListConsumer.as_asgi()),
    path('ws/friendrequests/', consumers.FriendRequestConsumer.as_asgi()),
]
