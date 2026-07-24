from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_201_CREATED
from rest_framework import status
from django.db import models

from apps.friends.models import FriendRequest, Friendship
from apps.friends.serializers import FriendRequestSerializer, UpdateFriendRequestSerializer

class SendFriendRequestView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = FriendRequestSerializer(data=request.data, context={'request': request})
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        receiver = serializer.validated_data['receiver']
        sender = request.user

        if sender == receiver:
            return Response({'error': 'Cannot send a friend request to yourself.'}, status=status.HTTP_400_BAD_REQUEST)

        if FriendRequest.objects.filter(sender=sender, receiver=receiver, status='pending').exists():
            return Response({'error': 'Friend request already sent.'}, status=status.HTTP_400_BAD_REQUEST)

        if Friendship.objects.filter(user=sender, friend=receiver).exists():
            return Response({'error': 'You are already friends.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            friend_request = serializer.save(sender=sender)
            return Response({
                'message': 'Friend request sent successfully',
                'request_id': friend_request.id
            }, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': 'An error occurred while sending the request.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UpdateFriendRequestView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        try:
            friend_request = FriendRequest.objects.get(pk=pk)
        except FriendRequest.DoesNotExist:
            return Response({'error': 'Friend request not found'}, status=status.HTTP_404_NOT_FOUND)

        if friend_request.receiver != request.user:
            return Response({'error': 'You are not authorized to update this request'}, status=status.HTTP_403_FORBIDDEN)

        serializer = UpdateFriendRequestSerializer(friend_request, data=request.data, partial=True)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        new_status = serializer.validated_data.get('status')
        friend_request.status = new_status
        friend_request.save(update_fields=['status'])

        if new_status == 'accepted':
            Friendship.objects.get_or_create(user=request.user, friend=friend_request.sender)
            Friendship.objects.get_or_create(user=friend_request.sender, friend=request.user)
            # friend_request.delete()
            return Response({'message': 'Friend request accepted'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Friend request updated'}, status=status.HTTP_200_OK)

class FriendshipDeleteAPIView(APIView):
    queryset = Friendship.objects.all()
    permission_classes = [IsAuthenticated]

    def delete(self, request, friend_id, format=None):
        try:
            friendships_to_delete = Friendship.objects.filter(
                models.Q(user=self.request.user.id, friend=friend_id) |
                models.Q(user=friend_id, friend=self.request.user.id)
            )

            if not friendships_to_delete.exists():
                return Response(
                    {"detail": "No friendship found between these users."},
                    status=status.HTTP_404_NOT_FOUND
                )

            friendships_to_delete.delete()

            return Response(
                {"detail": f"Friendship deleted successfully."},
                status=status.HTTP_200_OK
            )

        except Exception as e:
            return Response(
                {"detail": "An error occurred while trying to delete the friendship."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )