from django.db.models.signals import post_save
from django.core import mail
from kompres2015.custom_email.models import Email
from kompres2015.users.models import User


def send_email(sender, instance, created, **kwargs):
    users = list(User.objects.values_list('email', flat=True))
    mail.send_mail(
        instance.subject,
        instance.content,
        'abiraf.bot@gmail.com',
        users
    )

post_save.connect(send_email, sender=Email)