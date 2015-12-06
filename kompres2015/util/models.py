from django.db import models


class TimeStampedModel(models.Model):

    # there was a bug, you need two fields, need to inspect it later
    created_date = models.DateTimeField(auto_now_add=True, verbose_name='Tanggal')
    creation_date = models.DateTimeField(auto_now_add=True, verbose_name='Tanggal Modifikasi')

    def __str__(self):
        return str(self.created_date)

    class Meta:
        abstract = True
