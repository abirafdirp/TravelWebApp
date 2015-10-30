from django.db import models
from kompres2015.tourism.models import TravelDestination


class FrontPage(models.Model):
    video = models.TextField()
    featured = models.ForeignKey(TravelDestination)
    new = models.ForeignKey(TravelDestination)
