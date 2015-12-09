from django.db import models
from django.utils import formats

from ckeditor_uploader.fields import RichTextUploadingField
from filer.fields.file import FilerFileField

from kompres2015.util.models import TimeStampedModel
from kompres2015.region.models import District
from kompres2015.users.models import User


class TravelDestination(TimeStampedModel):
    TYPE_CHOICES = (
        ('Museum', 'Museum'),
        ('Wisata', 'Wisata'),
        ('Belanja', 'Belanja'),
        ('Point of Interest', 'Point of Interest'),
        ('Aktifitas', 'Aktifitas'),
        ('Monumen', 'Monumen'),
    )

    name = models.CharField(
        max_length=30,
        unique=True,
        verbose_name='Nama'
    )
    type = models.CharField(
        choices=TYPE_CHOICES,
        max_length=30,
        verbose_name='Kategori'
    )
    website = models.URLField(
        help_text="opsional",
        blank=True,
        null=True
    )
    latitude = models.FloatField()
    longitude = models.FloatField()
    district = models.ForeignKey(
        District,
        verbose_name='Kabupaten',
        related_name='travel_destinations',
    )
    thumbnail = models.ForeignKey(
        'image.TravelDestinationImage',
    )
    full_description = RichTextUploadingField(
        verbose_name='Deskripsi lengkap',
    )
    short_description = models.TextField(
        verbose_name='Deskripsi Singkat',
    )
    model_3d = FilerFileField(
        blank=True,
        null=True
    )

    class Meta:
        verbose_name = 'Lokasi Wisata'
        verbose_name_plural = 'Lokasi-lokasi Wisata'

    def __str__(self):
        return self.name


class TravelDestinationContent(TimeStampedModel):
    name = models.CharField(
        max_length=20,
        verbose_name='Judul'
    )
    content = RichTextUploadingField(verbose_name='Konten')
    travel_destination = models.ForeignKey(
        TravelDestination,
        related_name='contents'
    )

    class Meta:
        verbose_name = 'Konten Lokasi Wisata'
        verbose_name_plural = 'Konten-konten Lokasi Wisata'

    def __str__(self):
        return self.name


class Visit(TimeStampedModel):
    travel_destination = models.ForeignKey(
        TravelDestination,
        related_name='visits'
    )
    user = models.ForeignKey(User)
    date = models.DateField(verbose_name='tanggal', blank=True, null=True)

    # TODO change unique togther to date
    class Meta:
        verbose_name = 'Kunjungan'
        verbose_name_plural = 'Data Kunjungan'
        unique_together = ('created_date', 'travel_destination', 'user')

    def __str__(self):
        return str(self.created_date) + ' ' + self.user.username + ' ' + self.travel_destination.name


class Report(TimeStampedModel):
    CATEGORY_CHOICES = (
        ('keamanan', 'keamanan'),
        ('kebersihan', 'kebersihan'),
        ('kenyamanan', 'kenyamanan'),
        ('lainnya', 'lainnya'),
    )
    category = models.CharField(
        verbose_name="Kategori",
        max_length=30,
        choices=CATEGORY_CHOICES
    )
    report = models.TextField(verbose_name='Isi komplain')
    user = models.ForeignKey(
        User,
        related_name='reports',
        verbose_name='User'
    )
    travel_destination = models.ForeignKey(
        TravelDestination,
        verbose_name='Lokasi Wisata'
    )
    approved = models.BooleanField(
        default=False,
        verbose_name='Diverifikasi'
    )

    class Meta:
        verbose_name = 'Komplain pengunjung'
        verbose_name_plural = 'Komplain-komplain pengunjung'

    def __str__(self):
        return self.user.username + ' - ' + self.travel_destination.name + ' - ' \
               + formats.date_format(self.created_date, "SHORT_DATETIME_FORMAT")
