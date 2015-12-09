from django.db import models

from filer.fields.image import FilerImageField

from kompres2015.util.models import TimeStampedModel

from kompres2015.tourism.models import TravelDestination


class Page(TimeStampedModel):
    video = models.TextField(
        blank=True,
        null=True,
        help_text="menggunakan Youtube video ID"
    )
    video_start = models.IntegerField(
        blank=True,
        null=True,
        default=0,
        verbose_name="waktu dimulainya video (dalam detik)"
    )
    travel_destination_list_image = FilerImageField(
        blank=True,
        null=True,
        verbose_name="foto halaman depan lokasi wisata",
        related_name='destlist'
    )
    article_list_image = FilerImageField(
        blank=True,
        null=True,
        help_text="harap gambar berwarna gelap",
        verbose_name="foto halaman depan artikel",
        related_name='artlist'
    )
    article_list_tagline = models.CharField(
        max_length=80,
        blank=True,
        null=True,
        verbose_name='tagline di halaman depan artikel'
    )

    def admin_image1(self):
        return '<img src="%s" style="max-width: 400px; width: 100%%;"/>' % \
               self.article_list_image.url
    admin_image1.allow_tags = True
    admin_image1.short_description = 'Preview foto halaman depan lokasi wisata'

    def admin_image2(self):
        return '<img src="%s" style="max-width: 400px; width: 100%%;"/>' % \
               self.travel_destination_list_image.url
    admin_image2.allow_tags = True
    admin_image2.short_description = 'Preview foto halaman depan artikel'

    class Meta:
        verbose_name = 'Pengaturan'
        verbose_name_plural = 'Pengaturan'

    def __str__(self):
        return 'Pengaturan'


class FeaturedTravelDestination(TimeStampedModel):
    travel_destination = models.OneToOneField(TravelDestination)
    front_page = models.ForeignKey(Page, related_name='featureds')

    def __str__(self):
        return self.travel_destination.name


class HomeLink(TimeStampedModel):
    image = FilerImageField()
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

    def admin_image(self):
        return '<img src="%s" style="max-width: 400px; width: 100%%;"/>' % self.image.url
    admin_image.allow_tags = True
    admin_image.short_description = 'Preview'

    class Meta:
        verbose_name = 'Tautan Halaman Depan'
        verbose_name_plural = 'Tautan Halaman Depan'

    def __str__(self):
        return self.title + ' ' + self.link
