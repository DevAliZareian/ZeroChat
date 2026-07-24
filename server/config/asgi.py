import os

from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter

from apps.friends import routing as friends_routing
from apps.chat import routing as chat_routing

from utils.jwt_middleware import JWTAuthMiddleware

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": JWTAuthMiddleware(
        URLRouter([
            *friends_routing.websocket_urlpatterns,
            *chat_routing.websocket_urlpatterns
        ])
    ),
})