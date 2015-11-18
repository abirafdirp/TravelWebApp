from django.db import models
from ckeditor.fields import RichTextField

from kompres2015.util.models import TimeStampedModel

from kompres2015.image.models import ArticleMainImage


class Article(TimeStampedModel):
    CATEGORY_CHOICES = (
        ('berita', 'berita'),
        ('event', 'event'),
        ('info', 'info'),
        ('promosi', 'promosi'),
    )
    title = models.CharField(verbose_name='judul', unique=True, max_length=60)
    article = RichTextField(verbose_name='isi artikel')
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES)
    short_description = models.TextField(verbose_name="deskripsi singkat")
    author = models.TextField(verbose_name='penulis')
    main_image = models.ForeignKey(ArticleMainImage)

    def __str__(self):
        return self.title

