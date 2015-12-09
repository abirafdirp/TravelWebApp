from django.db import models

from filer.fields.image import FilerImageField

from kompres2015.tourism.models import TravelDestination
from kompres2015.tourism.models import Report
from kompres2015.tourism.models import TravelDestinationContent

from kompres2015.users.models import User

from kompres2015.util.models import TimeStampedModel


class Image(TimeStampedModel):
    name = models.TextField(verbose_name='nama')
    tag = models.TextField(null=True, blank=True)

    def admin_image(self):
        return '<img src="%s" style="max-width: 400px; width: 100%%;"/>' % self.image.url
    admin_image.allow_tags = True
    admin_image.short_description = 'Preview'

    def admin_image_list(self):
        return '<img src="%s" style="max-width: 100px; width: 100%%;"/>' % self.image.url
    admin_image_list.allow_tags = True
    admin_image_list.short_description = 'Preview'

    class Meta:
        verbose_name = 'Foto dan Gambar'
        verbose_name_plural = 'Semua Foto dan Gambar'

    def __str__(self):
        return self.name


class ReportImage(Image):
    report = models.ForeignKey(
        Report,
        related_name='images',
        verbose_name='Komplain'
    )
    user = models.ForeignKey(
        User,
        related_name='report_images',
        verbose_name='User'
    )
    image = FilerImageField()

    def admin_image(self):
        return '<img src="%s" style="max-width: 400px; width: 100%%;"/>' % self.image.url
    admin_image.allow_tags = True
    admin_image.short_description = 'Preview'

    def admin_image_list(self):
        return '<img src="%s" style="max-width: 100px; width: 100%%;"/>' % self.image.url
    admin_image_list.allow_tags = True
    admin_image_list.short_description = 'Preview'

    class Meta:
        verbose_name = 'Foto Komplain'
        verbose_name_plural = 'Foto-foto Komplain'


class TravelDestinationImage(Image):
    travel_destination = models.ForeignKey(
        TravelDestination,
        related_name='images',
        blank=True,
        null=True,
        verbose_name='Lokasi Wisata'
    )
    travel_destination_content = models.ForeignKey(
        TravelDestinationContent, related_name='images',
        blank=True,
        verbose_name='Konten Lokasi Wisata',
        null=True
    )
    image = FilerImageField()

    TYPE_CHOICES = (
        ('main', 'main'),
        ('gallery', 'gallery'),
        ('other', 'other'),
        ('thumbnail', 'thumbnail'),
    )
    type = models.CharField(choices=TYPE_CHOICES, max_length=20,
                            verbose_name='Tipe')

    def admin_image(self):
        return '<img src="%s" style="max-width: 400px; width: 100%%;"/>' % self.image.url
    admin_image.allow_tags = True
    admin_image.short_description = 'Preview'

    def admin_image_list(self):
        return '<img src="%s" style="max-width: 100px; width: 100%%;"/>' % self.image.url
    admin_image_list.allow_tags = True
    admin_image_list.short_description = 'Preview'

    class Meta:
        verbose_name = 'Foto Lokasi Wisata'
        verbose_name_plural = 'Foto-foto Lokasi Wisata'


class ArticleImage(Image):
    TYPE_CHOICES = (
        ('main', 'main'),
        ('thumbnail', 'thumbnail'),
        ('other', 'other'),
    )
    type = models.CharField(choices=TYPE_CHOICES, max_length=20,
                            verbose_name='Tipe')
    image = FilerImageField()
    article = models.ForeignKey('article.Article', blank=True, null=True,
                                related_name='images', verbose_name='Artikel')

    def admin_image(self):
        return '<img src="%s" style="max-width: 400px; width: 100%%;"/>' % self.image.url
    admin_image.allow_tags = True
    admin_image.short_description = 'Preview'

    def admin_image_list(self):
        return '<img src="%s" style="max-width: 100px; width: 100%%;"/>' % self.image.url
    admin_image_list.allow_tags = True
    admin_image_list.short_description = 'Preview'

    class Meta:
        verbose_name = 'Foto Artikel'
        verbose_name_plural = 'Foto-foto Artikel'
