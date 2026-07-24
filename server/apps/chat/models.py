from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Conversation(models.Model):
    name = models.CharField(max_length=255)
    users = models.ManyToManyField(User)
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def last_message(self):
        return self.messages.order_by('-timestamp').first()

    def __str__(self):
        return f"{self.name} Conversation with {', '.join([user.email for user in self.users.all()])}"

class Message(models.Model):
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message in {self.conversation.name} from {self.sender.email}: {self.content[:50]}"
