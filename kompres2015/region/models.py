from django.db import models
from kompres2015.util.models import TimeStampedModel


class Location(TimeStampedModel):
    latitude = models.FloatField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)


class Region(Location):
    name = models.CharField(max_length=40, unique=True)

    class Meta:
        verbose_name = "Wilayah"
        verbose_name_plural = "Wilayah"

    def get_provinces(self):
        return ", ".join([p.name for p in self.provinces.all()])
    get_provinces.short_description = 'Provinsi'

    def get_districts(self):
        districts = []
        for p in self.provinces.all():
            for x in p.districts.all():
                districts.append(x.name)
        return ", ".join(districts)
    get_districts.short_description = 'Kabupaten'

    def __str__(self):
        return self.name


class Province(Location):
    name = models.CharField(max_length=40, unique=True)
    region = models.ForeignKey(
        Region,
        related_name='provinces',
        verbose_name='Wilayah'
    )

    def get_districts(self):
        return ", ".join([p.name for p in self.districts.all()])
    get_districts.short_description = 'Kabupaten'

    class Meta:
        verbose_name = "Provinsi"
        verbose_name_plural = "Provinsi"

    def __str__(self):
        return self.name

    @staticmethod
    def autocomplete_search_fields():
        return 'name', 'region__name', 'districts__name'


class District(Location):
    name = models.CharField(max_length=40, unique=True)
    province = models.ForeignKey(
        Province,
        related_name='districts',
        verbose_name='Provinsi'
    )

    def get_region(self):
        return self.province.region.name
    get_region.short_description = "Wilayah"

    class Meta:
        verbose_name = "Kabupaten"
        verbose_name_plural = "Kabupaten"

    def __str__(self):
        return self.name

    def __unicode__(self):
        return unicode(self.name).encode('utf-8')

    @staticmethod
    def autocomplete_search_fields():
        return 'name', 'province__name', 'province__region__name'






