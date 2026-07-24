from django.apps import AppConfig

class FriendsConfig(AppConfig):
    name = 'apps.friends'

    def ready(self):
        import apps.friends.signals
