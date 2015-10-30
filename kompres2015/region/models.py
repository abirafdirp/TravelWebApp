from django.db import models
from kompres2015.util.models import TimeStampedModel


class Region(TimeStampedModel):
    name = models.CharField(max_length=40, primary_key=True)

    class Meta:
        verbose_name = "Wilayah"

    def __str__(self):
        return self.name


class Province(TimeStampedModel):
    name = models.CharField(max_length=40, primary_key=True)
    region = models.ForeignKey(Region)

    class Meta:
        verbose_name = "Provinsi"

    def __str__(self):
        return self.name


class District(TimeStampedModel):
    name = models.CharField(max_length=40, primary_key=True)
    province = models.ForeignKey(Province)

    class Meta:
        verbose_name = "Kabupaten"

    def __str__(self):
        return self.name






