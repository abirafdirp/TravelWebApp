from rest_framework import viewsets

from kompres2015.pages.models import Page
from kompres2015.pages.models import FeaturedTravelDestination

from kompres2015.pages.serializers import PageSerializer
from kompres2015.pages.serializers import FeaturedTravelDestinationSerializer


class PageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Page.objects.all()
    serializer_class = PageSerializer


class FeaturedTravelDestinationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FeaturedTravelDestination.objects.all()
    serializer_class = FeaturedTravelDestinationSerializer
