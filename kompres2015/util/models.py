from django.db import models


class TimeStampedModel(models.Model):

    """
    Abstract model class that provides
    self-updating 'created' and 'modified'
    fields.
    """

    created_date = models.DateTimeField(auto_now_add=True)
    creation_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True
