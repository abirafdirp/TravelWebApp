from django.db import models


class TimeStampedModel(models.Model):

    """
    Abstract model class that provides
    self-updating 'created' and 'modified'
    fields.
    """

    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True


class Region(TimeStampedModel):
    name = models.CharField(max_length=40, primary_key=True)

    def __str__(self):
        return self.name


class Province(TimeStampedModel):
    name = models.CharField(max_length=40, primary_key=True)
    region = models.ForeignKey(Region)

    def __str__(self):
        return self.name


class District(TimeStampedModel):
    name = models.CharField(max_length=40, primary_key=True)
    province = models.ForeignKey(Province)

    def __str__(self):
        return self.name






