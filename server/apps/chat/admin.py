# apps/chat/admin.py
from django.contrib import admin
from django.utils.html import format_html
from django.urls import reverse
from .models import Conversation, Message


class MessageInline(admin.TabularInline):
    model = Message
    fields = ('sender', 'content_preview', 'timestamp')
    readonly_fields = ('timestamp', 'content_preview')
    extra = 0
    ordering = ('-timestamp',)
    can_delete = False
    show_change_link = True

    def content_preview(self, obj):
        return (obj.content[:50] + '…') if len(obj.content) > 50 else obj.content
    content_preview.short_description = 'Content'


@admin.register(Conversation)
class ConversationAdmin(admin.ModelAdmin):
    list_display = ('id', 'display_name', 'participants_count', 'message_count', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('name', 'users__email')
    filter_horizontal = ('users',)
    readonly_fields = ('created_at', 'participants_display')
    inlines = [MessageInline]
    date_hierarchy = 'created_at'
    ordering = ('-created_at',)

    fieldsets = (
        (None, {
            'fields': ('name', 'users', 'created_at')
        }),
        ('Participants', {
            'fields': ('participants_display',),
            'classes': ('collapse',),
        }),
    )

    def display_name(self, obj):
        return obj.name or f"Conversation {obj.id}"
    display_name.short_description = 'Name'
    display_name.admin_order_field = 'name'

    def participants_count(self, obj):
        return obj.users.count()
    participants_count.short_description = 'Participants'

    def message_count(self, obj):
        return obj.messages.count()
    message_count.short_description = 'Messages'

    def participants_display(self, obj):
        if not obj.pk:
            return "Save first to view participants."
        emails = [user.email for user in obj.users.all()]
        return format_html("<br>".join(emails)) if emails else "—"
    participants_display.short_description = 'Participant Emails'


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ('id', 'conversation_link', 'sender', 'content_preview', 'timestamp')
    list_filter = ('timestamp', 'conversation')
    search_fields = ('content', 'sender__email', 'conversation__name')
    readonly_fields = ('timestamp',)
    date_hierarchy = 'timestamp'
    ordering = ('-timestamp',)
    raw_id_fields = ('conversation', 'sender')
    autocomplete_fields = ('sender',)

    def conversation_link(self, obj):
        if obj.conversation_id:
            try:
                url = reverse('admin:chat_conversation_change', args=[obj.conversation_id])
                return format_html('<a href="{}">{}</a>', url, obj.conversation)
            except Exception:
                return str(obj.conversation)
        return "—"
    conversation_link.short_description = 'Conversation'

    def content_preview(self, obj):
        return (obj.content[:75] + '…') if len(obj.content) > 75 else obj.content
    content_preview.short_description = 'Content'