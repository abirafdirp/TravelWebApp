from django.db import models

from ckeditor_uploader.fields import RichTextUploadingField

from kompres2015.util.models import TimeStampedModel


class Email(TimeStampedModel):
    subject = models.TextField()
    content = RichTextUploadingField()

    class Meta:
        verbose_name = 'Email'
        verbose_name_plural = 'Email'

    def __str__(self):
        return self.subject