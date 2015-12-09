from django.apps import AppConfig


class CustomEmailConfig(AppConfig):
    name = 'kompres2015.custom_email'
    verbose_name = 'Email'

    def ready(self):
        import kompres2015.custom_email.signals