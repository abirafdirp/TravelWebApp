from django.db import models
from django.utils import formats

from ckeditor.fields import RichTextField

from kompres2015.util.models import TimeStampedModel
from kompres2015.region.models import District
from kompres2015.users.models import User


class Transportation(TimeStampedModel):
    name = models.CharField(max_length=40)


class TravelDestination(TimeStampedModel):
    TYPE_CHOICES = (
        ('Museum', 'Museum'),
        ('Wisata', 'Wisata'),
        ('Belanja', 'Belanja'),
        ('Point of Interest', 'Point of Interest'),
        ('Aktifitas', 'Aktifitas'),
        ('Lokasi Historis', 'Lokasi Historis'),
    )

    name = models.CharField(max_length=30, unique=True)
    type = models.CharField(choices=TYPE_CHOICES, max_length=30)
    latitude = models.FloatField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)
    district = models.ForeignKey(District, verbose_name='Kabupaten',
                                 related_name='travel_destinations',
                                 blank=True, null=True)
    thumbnail = models.ForeignKey('image.TravelDestinationImage', blank=True, null=True)
    full_description = RichTextField(verbose_name='Deskripsi lengkap',
                                     blank=True, null=True)
    short_description = models.TextField(verbose_name='Deskripsi Singkat',
                               blank=True, null=True)

    class Meta:
        verbose_name = 'Lokasi Wisata'

    def __str__(self):
        return self.name


class TravelDestinationContent(TimeStampedModel):
    name = models.CharField(max_length=30)
    content = RichTextField()
    travel_destination = models.ForeignKey(TravelDestination, related_name='contents')

    class Meta:
        verbose_name = 'Konten Lokasi Wisata'

    def __str__(self):
        return self.name


class Visit(TimeStampedModel):
    travel_destination = models.ForeignKey(TravelDestination, related_name='visits')
    user = models.ForeignKey(User)

    class Meta:
        verbose_name = 'Kunjungan'
        unique_together = ('creation_date', 'travel_destination', 'user')

    def __str__(self):
        return str(self.created_date) + ' ' + self.user.name + ' ' + self.travel_destination.name


class Report(TimeStampedModel):
    CATEGORY_CHOICES = (
        ('keamanan', 'keamanan'),
        ('kebersihan', 'kebersihan'),
        ('kenyamanan', 'kenyamanan'),
        ('lainnya', 'lainnya'),
    )
    category = models.CharField(verbose_name="Kategori", max_length=30,
                                choices=CATEGORY_CHOICES)
    report = models.TextField(verbose_name='Isi komplain')
    user = models.ForeignKey(User)
    travel_destination = models.ForeignKey(TravelDestination)

    class Meta:
        verbose_name = 'Komplain pengunjung'

    def __str__(self):
        return self.user.username + ' - ' + self.travel_destination.name + ' - ' \
               + formats.date_format(self.created_date, "SHORT_DATETIME_FORMAT")
