from django.db import models

from kompres2015.util.models import TimeStampedModel

from kompres2015.tourism.models import TravelDestination


class HomePage(TimeStampedModel):
    video = models.TextField()

    def __str__(self):
        return 'Halaman depan'


class FeaturedTravelDestination(TimeStampedModel):
    travel_destination = models.OneToOneField(TravelDestination)
    front_page = models.ForeignKey(HomePage, related_name='featureds')

    def __str__(self):
        return self.travel_destination.name