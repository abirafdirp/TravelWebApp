from django.db import models
from kompres2015.util.models import TimeStampedModel
from kompres2015.region.models import Region
from kompres2015.users.models import User


class TravelDestination(TimeStampedModel):
    name = models.CharField(max_length=30, primary_key=True)
    region = models.ForeignKey(Region)
    overall_rating = models.IntegerField()
    facility_rating = models.IntegerField()
    cleanliness_rating = models.IntegerField()
    ease_of_travel_rating = models.IntegerField()

    def __str__(self):
        return self.name


class Visit(models.Model):
    date = models.DateField()
    travel_destination = models.ForeignKey(TravelDestination)
    user = models.ForeignKey(User)

    class Meta:
        unique_together = ('date', 'travel_destination', 'user')


