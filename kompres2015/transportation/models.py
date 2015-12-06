from django.db import models

from kompres2015.util.models import TimeStampedModel
from kompres2015.region.models import District


class Transportation(TimeStampedModel):
    name = models.CharField(
        max_length=40,
        verbose_name='nama'
    )
    districts = models.ManyToManyField(
        District,
        related_name='transportations',
        verbose_name='Kabupaten'
    )
    description = models.TextField(verbose_name='Deskripsi')
    website = models.URLField(
        blank=True,
        null=True
    )
    # TODO unset null
    image = models.ImageField(null=True, blank=True)

    def admin_image(self):
        return '<img src="%s" style="max-width: 400px; width: 100%%;"/>' % self.image.url
    admin_image.allow_tags = True
    admin_image.short_description = 'Preview'

    def get_districts(self):
        return ", ".join([p.name for p in self.districts.all()])
    get_districts.short_description = 'Beroperasi di daerah'

    def link_it(self):
        return '<a href="%s">%s</a>' % (self.website, self.website)
    link_it.allow_tags = True
    link_it.short_description = 'Website'

    class Meta:
        verbose_name = 'Metoda Transportasi'
        verbose_name_plural = 'Metoda-metoda Transportasi'

    def __str__(self):
        return self.name
