from django.db import models
from kompres2015.util.models import TimeStampedModel


class Region(TimeStampedModel):
    name = models.CharField(max_length=40)

    # REST api lookup field
    region_pk_api = models.IntegerField(blank=True, null=True)

    class Meta:
        verbose_name = "Wilayah"
        unique_together = ('id', 'name')

    def save(self, *args, **kwargs):
        super(TimeStampedModel, self).save(*args, **kwargs)
        if not self.region_pk_api:
            self.region_pk_api = self.id
            self.save()

    def __str__(self):
        return self.name


class Province(TimeStampedModel):
    name = models.CharField(max_length=40)
    region = models.ForeignKey(Region, related_name='provinces')

    province_pk_api = models.IntegerField(blank=True, null=True)

    class Meta:
        verbose_name = "Provinsi"
        unique_together = ('id', 'name')

    def save(self, *args, **kwargs):
        super(TimeStampedModel, self).save(*args, **kwargs)
        if not self.province_pk_api:
            self.province_pk_api = self.id
            self.save()

    def __str__(self):
        return self.name


class District(TimeStampedModel):
    name = models.CharField(max_length=40)
    province = models.ForeignKey(Province, related_name='districts')

    district_pk_api = models.IntegerField(blank=True, null=True)

    class Meta:
        verbose_name = "Kabupaten"
        unique_together = ('id', 'name')

    def save(self, *args, **kwargs):
        super(TimeStampedModel, self).save(*args, **kwargs)
        if not self.district_pk_api:
            self.district_pk_api = self.id
            self.save()

    def __str__(self):
        return self.name






