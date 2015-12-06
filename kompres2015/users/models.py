# -*- coding: utf-8 -*-
from __future__ import unicode_literals, absolute_import

from django.contrib.auth.models import AbstractUser
from django.core.urlresolvers import reverse
from django.db import models
from django.utils.encoding import python_2_unicode_compatible
from django.utils.translation import ugettext_lazy as _

from annoying.fields import AutoOneToOneField
from ckeditor.fields import RichTextField

from kompres2015.util.models import TimeStampedModel


@python_2_unicode_compatible
class User(AbstractUser):

    # First Name and Last Name do not cover name patterns
    # around the globe.
    name = models.CharField(_("Name of User"), max_length=255)
    shadow_banned = models.BooleanField(default=False)

    def __str__(self):
        return self.username

    def get_absolute_url(self):
        return reverse('users:detail', kwargs={'username': self.username})


class UserProfile(models.Model):
    user = AutoOneToOneField(User, related_name='userprofile', primary_key=True)

    district = models.ForeignKey('region.District', blank=True, null=True)

    def __str__(self):
        return self.user.username


class Email(TimeStampedModel):
    subject = models.CharField(max_length=50)
    content = RichTextField()
