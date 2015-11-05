from django.db import models
from kompres2015.util.models import TimeStampedModel


class Region(TimeStampedModel):
    name = models.CharField(max_length=40)

    class Meta:
        verbose_name = "Wilayah"
        unique_together = ('id', 'name')

    def __str__(self):
        return self.name


class Province(TimeStampedModel):
    name = models.CharField(max_length=40)
    region = models.ForeignKey(Region, related_name='provinces')

    class Meta:
        verbose_name = "Provinsi"
        unique_together = ('id', 'name')

    def __str__(self):
        return self.name


class District(TimeStampedModel):
    name = models.CharField(max_length=40)
    province = models.ForeignKey(Province, related_name='districts')

    class Meta:
        verbose_name = "Kabupaten"
        unique_together = ('id', 'name')

    def __str__(self):
        return self.name






