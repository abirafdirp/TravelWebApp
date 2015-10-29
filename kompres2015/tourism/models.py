from django.db import models
from kompres2015.region.models import Region


class TimeStampedModel(models.Model):

    """
    Abstract model class that provides
    self-updating 'created' and 'modified'
    fields.
    """

    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True


class TravelDestination(TimeStampedModel):
    name = models.CharField(max_length=30, primary_key=True)
    region = models.ForeignKey(Region)

    def __str__(self):
        return self.name


class Visit(models.Model):
    date = models.DateField()
    travel_destination = models.ForeignKey(TravelDestination)
    visit = models.IntegerField()

    class Meta:
        unique_together = ('date', 'travel_destination',)


