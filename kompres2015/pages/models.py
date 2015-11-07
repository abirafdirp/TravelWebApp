from django.db import models

from kompres2015.util.models import TimeStampedModel

from kompres2015.tourism.models import TravelDestination


class FrontPage(TimeStampedModel):
    video = models.TextField()


class FeaturedTravelDestination(TimeStampedModel):
    travel_destination = models.ForeignKey(TravelDestination, related_name='featureds')
    front_page = models.ForeignKey(FrontPage)