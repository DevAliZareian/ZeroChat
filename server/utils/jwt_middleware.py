from asgiref.sync import sync_to_async
from urllib.parse import parse_qs

class JWTAuthMiddleware:
    def __init__(self, inner):
        self.inner = inner

    async def __call__(self, scope, receive, send):
        query_string = scope.get("query_string", b"")
        query_params = parse_qs(query_string)
        token_list = query_params.get(b"token", [])

        token = token_list[0].decode() if token_list else None

        if not token:
            headers = dict(scope.get("headers", []))
            token_header = headers.get(b"authorization", b"")
            if token_header.startswith(b"Bearer "):
                token = token_header.split(b" ")[1].decode()

        if token:
            from rest_framework_simplejwt.authentication import JWTAuthentication
            from django.contrib.auth.models import AnonymousUser
            auth = JWTAuthentication()
            try:
                validated_token = await sync_to_async(auth.get_validated_token)(token)
                user = await sync_to_async(auth.get_user)(validated_token)
                scope["user"] = user
            except Exception as e:
                print(f"JWT error: {e}")
                scope["user"] = AnonymousUser()
        else:
            scope["user"] = AnonymousUser()

        return await self.inner(scope, receive, send)
