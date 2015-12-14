from django.contrib.sitemaps import Sitemap
from kompres2015.tourism.models import TravelDestination


class TravelDestinationSitemap(Sitemap):
    changefreq = "never"
    priority = 0.9

    def items(self):
        return TravelDestination.objects.all()

    def lastmod(self, obj):
        return obj.modified_date

    def location(self, obj):
        return '/lokasi-wisata/' + obj.name.lower().replace(' ','-')