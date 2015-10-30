from django.db import models
from ckeditor.fields import RichTextField
from kompres2015.util.models import TimeStampedModel
from kompres2015.region.models import Region
from kompres2015.users.models import User


class TravelDestination(TimeStampedModel):
    name = models.CharField(max_length=30, primary_key=True)
    district = models.ForeignKey(Region, verbose_name='Kabupaten')
    full_description = RichTextField(verbose_name="Deskripsi lengkap")
    tagline = models.CharField(verbose_name='Deskripsi Singkat/Tagline',
                               max_length=100)
    what_to_do = RichTextField(verbose_name="Aktivitas yang bisa dilakukan")
    transport_method = RichTextField(verbose_name='Metode Transport')
    where_to_stay = RichTextField(verbose_name='Akomodasi')
    important_info_contact = RichTextField(verbose_name="Info dan kontak penting")

    class Meta:
        verbose_name = "Lokasi Wisata"

    def __str__(self):
        return self.name


class Visit(models.Model):
    date = models.DateField()
    travel_destination = models.ForeignKey(TravelDestination)
    user = models.ForeignKey(User)

    class Meta:
        verbose_name = "Kunjungan"

    class Meta:
        unique_together = ('date', 'travel_destination', 'user')


class Report(TimeStampedModel):
    category = models.CharField(verbose_name="Kategori", max_length=30)





