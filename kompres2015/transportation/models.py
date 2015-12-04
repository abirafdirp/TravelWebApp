from django.db import models

from kompres2015.util.models import TimeStampedModel
from kompres2015.region.models import District


class Transportation(TimeStampedModel):
    name = models.CharField(max_length=40)
    districts = models.ManyToManyField(District, related_name='transportations')
    description = models.TextField()
    website = models.URLField(blank=True, null=True)
    # TODO unset null
    image = models.ImageField(blank=True, null=True)

    class Meta:
        verbose_name = 'Metoda Transportasi'

    def __str__(self):
        return self.name
