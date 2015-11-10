from django.db import models

from kompres2015.tourism.models import TravelDestination
from kompres2015.tourism.models import Report

from kompres2015.util.models import TimeStampedModel


class Image(TimeStampedModel):
    name = models.TextField()
    image = models.ImageField()
    tag = models.TextField(null=True)

    def __str__(self):
        return self.name


class ReportImage(Image):
    report = models.ForeignKey(Report, related_name='report_images')

    class Meta:
        verbose_name = 'Foto komplain'

    def __str__(self):
        return self.name


class TravelDestinationMainImage(Image):
    travel_destination = models.ForeignKey(TravelDestination)

    class Meta:
        verbose_name = 'Foto lokasi wisata utama'

    def __str__(self):
        return self.name


class TravelDestinationWhatToDoImage(Image):
    travel_destination = models.ForeignKey(TravelDestination)

    class Meta:
        verbose_name = 'Foto what-to-do lokasi wisata'

    def __str__(self):
        return self.name


class TravelDestinationGalleryImage(Image):
    travel_destination = models.ForeignKey(TravelDestination)

    class Meta:
        verbose_name = 'Foto galeri lokasi wisata'

    def __str__(self):
        return self.name


class ArticleMainImage(Image):
    def __str__(self):
        return self.name
