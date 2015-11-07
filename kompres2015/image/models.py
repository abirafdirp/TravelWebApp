from django.db import models

from kompres2015.tourism.models import TravelDestination

from kompres2015.util.models import TimeStampedModel


class Image(TimeStampedModel):
    name = models.TextField()
    image = models.ImageField()
    tag = models.TextField(null=True)


class ReportImage(Image):
    travel_destination = models.ForeignKey(TravelDestination)

    class Meta:
        verbose_name = 'Foto komplain'


class TravelDestinationMainImage(Image):
    travel_destination = models.ForeignKey(TravelDestination)

    class Meta:
        verbose_name = 'Foto lokasi wisata utama'


class TravelDestinationWhatToDoImage(Image):
    travel_destination = models.ForeignKey(TravelDestination)

    class Meta:
        verbose_name = 'Foto what-to-do lokasi wisata'


class TravelDestinationGalleryImage(Image):
    travel_destination = models.ForeignKey(TravelDestination)

    class Meta:
        verbose = 'Foto galeri lokasi wisata'
