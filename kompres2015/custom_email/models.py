from django.db import models

from ckeditor_uploader.fields import RichTextUploadingField

from kompres2015.util.models import TimeStampedModel
from kompres2015.users.models import User


class Email(TimeStampedModel):
    recipients = models.ManyToManyField(
        User,
        blank=True,
        null=True,
        related_name='emails'
    )
    send_to_all_users = models.NullBooleanField(
        blank=True,
        null=True,
        verbose_name='Kirim ke semua pengguna'
    )
    subject = models.TextField()
    content_plaintext = models.TextField()
    content = RichTextUploadingField()

    class Meta:
        verbose_name = 'Email'
        verbose_name_plural = 'Email'

    def __str__(self):
        return self.subject