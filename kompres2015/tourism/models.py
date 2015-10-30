from django.db import models
from kompres2015.util.models import TimeStampedModel
from kompres2015.region.models import Region
from kompres2015.users.models import User


class TravelDestination(TimeStampedModel):
    name = models.CharField(max_length=30, primary_key=True)
    region = models.ForeignKey(Region, verbose_name='Wilayah')
    full_description = models.TextField(verbose_name="Deskripsi lengkap")
    tagline = models.CharField(verbose_name='Deskripsi Singkat/Tagline',
                               max_length=100)
    transport_method = models.TextField(verbose_name='Metode Transport')
    important_info_contact = models.TextField(
        verbose_name='kontak dan info penting lainnya')

    def __str__(self):
        return self.name


class Visit(models.Model):
    date = models.DateField()
    travel_destination = models.ForeignKey(TravelDestination)
    user = models.ForeignKey(User)

    class Meta:
        unique_together = ('date', 'travel_destination', 'user')




