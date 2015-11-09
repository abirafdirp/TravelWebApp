from rest_framework import viewsets

from kompres2015.pages.models import HomePage
from kompres2015.pages.models import FeaturedTravelDestination

from kompres2015.pages.serializers import HomePageSerializer
from kompres2015.pages.serializers import FeaturedTravelDestinationSerializer


class HomePageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HomePage.objects.all()
    serializer_class = HomePageSerializer


class FeaturedTravelDestinationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FeaturedTravelDestination.objects.all()
    serializer_class = FeaturedTravelDestinationSerializer
