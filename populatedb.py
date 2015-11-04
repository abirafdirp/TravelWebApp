import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE',
                      'config.settings.local')

import django
django.setup()

from kompres2015.tourism.models import TravelDestination
from kompres2015.tourism.models import Visit
from kompres2015.region.models import Region
from kompres2015.region.models import District
from kompres2015.region.models import Province
from kompres2015.pages.models import FrontPage

def cleardb():
    # clear current database
    #TravelDestination.objects.all().delete()
    #Visit.objects.all().delete()
    District.objects.all().delete()
    Province.objects.all().delete()
    Region.objects.all().delete()
    #FrontPage.objects().delete()
    print 'current database cleared'


def add_region(name):
    Region.objects.create(name=name)


def add_province(name, province):
    region = Region.objects.get(name=province)
    Province.objects.create(name=name, region=region)


def add_district(name, province):
    province = Province.objects.get(name=province)
    District.objects.create(name=name, province=province)

cleardb()
add_region('Jawa')
add_province('Jakarta', 'Jawa')
add_district('Jakarta Selatan', 'Jakarta')

