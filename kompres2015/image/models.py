from django.db import models
from kompres2015.util.models import TimeStampedModel


class Image(TimeStampedModel):
    name = models.TextField()
    image = models.ImageField()
