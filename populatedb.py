import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE',
                      'config.settings.local')

import sys
import django
django.setup()

from django.conf import settings
from django.contrib.auth.models import check_password
from django.contrib.auth import authenticate
from kompres2015.tourism.models import TravelDestination
from kompres2015.tourism.models import Visit
from kompres2015.region.models import Region
from kompres2015.region.models import District
from kompres2015.region.models import Province
from kompres2015.pages.models import FrontPage

def cleardb():
    # clear current database
    TravelDestination.objects.all().delete()
    Visit.objects.all().delete()
    Region.objects.all().delete()
    District.objects.all().delete()
    Province.objects().delete()
    FrontPage.objects().delete()
    print 'current database cleared'


def add_region(name):
    Region.objects.create(name=name)


def add_province(name):
    Province.objects.create(name=name)


def add_district(name):
    District.objects.create(name=name)

# def add_travel_destination(name, region, )

