from django.db import models

from kompres2015.util.models import TimeStampedModel

from kompres2015.tourism.models import TravelDestination


class Page(TimeStampedModel):
    video = models.TextField(blank=True, null=True)
    video_start = models.IntegerField(blank=True, null=True)
    travel_destination_list_image = models.ImageField(blank=True, null=True)
    article_list_image = models.ImageField(blank=True, null=True, help_text="harap gambar berwarna gelap")
    article_list_tagline = models.CharField(max_length=80, blank=True, null=True)

    def __str__(self):
        return 'Data Page'


class FeaturedTravelDestination(TimeStampedModel):
    travel_destination = models.OneToOneField(TravelDestination)
    front_page = models.ForeignKey(Page, related_name='featureds')

    def __str__(self):
        return self.travel_destination.name


class HomeLink(TimeStampedModel):
    image = models.ImageField()
    title = models.CharField(max_length=30)
    link = models.CharField(max_length=100)
    page = models.ForeignKey(Page, related_name='homelinks')
    description = models.CharField(max_length=150)

    TYPE_CHOICES = (
        ('at video', 'at video'),
        ('main 1', 'main 1'),
        ('main 2', 'main 2'),
        ('common', 'common'),
    )
    type = models.CharField(choices=TYPE_CHOICES, blank=True, null=True, max_length=15)

    def __str__(self):
        return self.title + ' ' + self.link
