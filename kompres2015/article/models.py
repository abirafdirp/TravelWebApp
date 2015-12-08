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
    title = models.CharField(
        verbose_name='Judul',
        unique=True,
        max_length=60)
    category = models.CharField(
        max_length=30,
        choices=CATEGORY_CHOICES,
        verbose_name='Kategori'
    )
    short_description = models.TextField(verbose_name='Deskripsi singkat')
    author = models.TextField(verbose_name='Penulis')
    date = models.DateField(verbose_name='Tanggal')
    thumbnail = models.ForeignKey(
        ArticleImage,
        related_name='article_thumbnail'
    )
    main_image = models.ForeignKey(
        ArticleImage,
        related_name='article_main_image',
        verbose_name='Foto utama'
    )
    article = RichTextUploadingField(
        verbose_name='Isi artikel'
    )

    class Meta:
        verbose_name = 'Artikel'
        verbose_name_plural = 'Artikel'

    def __str__(self):
        return self.title

