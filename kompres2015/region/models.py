from django.db import models
from kompres2015.util.models import TimeStampedModel


class Region(TimeStampedModel):
    name = models.CharField(max_length=40, unique=True)

    class Meta:
        verbose_name = "Wilayah"

    def __str__(self):
        return self.name


class Province(TimeStampedModel):
    name = models.CharField(max_length=40, unique=True)
    region = models.ForeignKey(Region, related_name='provinces')

    class Meta:
        verbose_name = "Provinsi"

    def __str__(self):
        return self.name


class District(TimeStampedModel):
    name = models.CharField(max_length=40, unique=True)
    province = models.ForeignKey(Province, related_name='districts')

    class Meta:
        verbose_name = "Kabupaten"

    def __str__(self):
        return self.name






