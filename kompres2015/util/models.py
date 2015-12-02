from django.db import models


class TimeStampedModel(models.Model):

    # there was a bug, you need two fields, need to inspect it later
    created_date = models.DateTimeField(auto_now_add=True)
    creation_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True
