from django.db import models
from ckeditor_uploader.fields import RichTextUploadingField

from kompres2015.image.models import ArticleImage

from kompres2015.util.models import TimeStampedModel


class Article(TimeStampedModel):
    CATEGORY_CHOICES = (
        ('berita', 'berita'),
        ('event', 'event'),
        ('info', 'info'),
        ('promosi', 'promosi'),
    )
    title = models.CharField(verbose_name='judul', unique=True, max_length=60)
    article = RichTextUploadingField(verbose_name='isi artikel')
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES)
    short_description = models.TextField(verbose_name="deskripsi singkat")
    author = models.TextField(verbose_name='penulis')
    date = models.DateField()
    thumbnail = models.ForeignKey(ArticleImage, related_name='article_thumbnail')
    main_image = models.ForeignKey(ArticleImage, related_name='article_main_image')

    def __str__(self):
        return self.title

