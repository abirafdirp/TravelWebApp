from django.db import models

from kompres2015.tourism.models import TravelDestination
from kompres2015.tourism.models import Report
from kompres2015.tourism.models import TravelDestinationContent

from kompres2015.users.models import User

from kompres2015.util.models import TimeStampedModel


class Image(TimeStampedModel):
    name = models.TextField()
    tag = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name


class ReportImage(Image):
    report = models.ForeignKey(Report, related_name='images')
    user = models.ForeignKey(User, related_name='report_images')
    image = models.ImageField(upload_to='reports')

    class Meta:
        verbose_name = 'Foto komplain'


class TravelDestinationImage(Image):
    travel_destination = models.ForeignKey(TravelDestination, related_name='images',
                                           blank=True, null=True)
    travel_destination_content = models.ForeignKey(TravelDestinationContent, related_name='images',
                                                   blank=True, null=True)
    image = models.ImageField(upload_to='travel_destinations')

    TYPE_CHOICES = (
        ('main', 'main'),
        ('gallery', 'gallery'),
        ('other', 'other'),
        ('thumbnail', 'thumbnail'),
    )
    type = models.CharField(choices=TYPE_CHOICES, max_length=20)

    class Meta:
        verbose_name = 'Foto lokasi wisata'


class ArticleImage(Image):
    TYPE_CHOICES = (
        ('main', 'main'),
        ('thumbnail', 'thumbnail'),
        ('other', 'other'),
    )
    type = models.CharField(choices=TYPE_CHOICES, max_length=20)
    image = models.ImageField(upload_to='articles')
    article = models.ForeignKey('article.Article', blank=True, null=True, related_name='images')

    class Meta:
        verbose_name = 'Foto Artikel'
