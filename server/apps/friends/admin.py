from django.contrib import admin
from .models import Friendship, FriendRequest

class FriendshipAdmin(admin.ModelAdmin):
    list_display = ('id' ,'user', 'friend')
    search_fields = ['user__email', 'friend__email']
    list_filter = ['created_at']

admin.site.register(Friendship, FriendshipAdmin)

class FriendRequestAdmin(admin.ModelAdmin):
    list_display = ('id', 'sender', 'receiver', 'status')
    search_fields = ['sender__email', 'receiver__email']
    list_filter = ['status', 'created_at']

admin.site.register(FriendRequest, FriendRequestAdmin)
