from rest_framework import viewsets

from kompres2015.pages.models import FrontPage
from kompres2015.pages.models import FeaturedTravelDestination

from kompres2015.pages.serializers import FrontPageSerializer
from kompres2015.pages.serializers import FeaturedTravelDestinationSerializer


class FrontPageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FrontPage.objects.all()
    serializer_class = FrontPageSerializer


class FeaturedTravelDestinationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FeaturedTravelDestination.objects.all()
    serializer_class = FeaturedTravelDestinationSerializer
