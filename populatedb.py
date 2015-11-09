import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE',
                      'config.settings.local')

import django
django.setup()

from kompres2015.tourism.models import TravelDestination
from kompres2015.tourism.models import Visit
from kompres2015.tourism.models import Report

from kompres2015.region.models import Region
from kompres2015.region.models import District
from kompres2015.region.models import Province

from kompres2015.users.models import User

from kompres2015.pages.models import HomePage


def cleardb():
    # clear current database
    TravelDestination.objects.all().delete()
    #Visit.objects.all().delete()
    District.objects.all().delete()
    Province.objects.all().delete()
    Region.objects.all().delete()
    User.objects.all().delete()
    #FrontPage.objects().delete()
    print 'current database cleared'


def add_user(username, name):
    User.objects.create(username=username, name=name)


def add_region(name):
    Region.objects.create(name=name)


def add_province(name, province):
    region = Region.objects.get(name=province)
    Province.objects.create(name=name, region=region)


def add_district(name, province):
    province = Province.objects.get(name=province)
    District.objects.create(name=name, province=province)


def add_travel_destination(name, district):
    district = District.objects.get(name=district)
    TravelDestination.objects.create(name=name, district=district)


def add_visit(username, travel_destination):
    travel_destination = TravelDestination.objects.get(name=travel_destination)
    user = User.objects.get(username=username)
    Visit.objects.create(user=user, travel_destination=travel_destination)


def add_report(username, report, category, travel_destination_name):
    user = User.objects.get(username=username)
    travel_destination = TravelDestination.objects.get(name=travel_destination_name)
    Report.objects.create(user=user, report=report, category=category, travel_destination=travel_destination)

cleardb()

add_region('Jawa')
add_region('Sumatera')

add_province('Jakarta', 'Jawa')
add_province('Jawa Barat', 'Jawa')
add_province('Sumatera Utara', 'Sumatera')

add_district('Jakarta Selatan', 'Jakarta')
add_district('Jakarta Pusat', 'Jakarta')
add_district('Bandung', 'Jawa Barat')

add_user('lutfi', 'lutfi')

add_travel_destination('Monas', 'Jakarta Pusat')

add_visit(username='lutfi', travel_destination='Monas')

add_report(username='lutfi', report='Kotor', category='kebersihan', travel_destination_name='Monas')
