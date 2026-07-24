from django.contrib.auth import get_user_model

from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.generics import RetrieveAPIView

from apps.accounts.serializers import RegisterSerializer, LoginSerializer, UserSerializer

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.save()
        tokens = get_tokens_for_user(user)

        return Response({
            'user': serializer.data,
            'tokens': tokens
        })

class LoginView(TokenObtainPairView):
    serializer_class = LoginSerializer

class MeView(RetrieveAPIView):
    serializer_class = UserSerializer
    pagination_class = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

# helper
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {'refresh': str(refresh), 'access': str(refresh.access_token)}