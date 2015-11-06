from rest_framework import viewsets

from kompres2015.tourism.models import TravelDestination
from kompres2015.tourism.models import Visit

from kompres2015.tourism.serializers import TravelDestinationSerializer
from kompres2015.tourism.serializers import VisitSerializer


class TravelDestinationViewset(viewsets.ReadOnlyModelViewSet):
    filter_fields = ('name',)
    serializer_class = TravelDestinationSerializer

    def get_queryset(self):
        queryset = TravelDestination.objects.all()
        # province = self.request.query_params.get('province', None)
        # if province is not None:
        #     queryset = queryset.filter(district__name=province)
        return queryset


class VisitViewset(viewsets.ReadOnlyModelViewSet):
    serializer_class = VisitSerializer

    def get_queryset(self):
        queryset = Visit.objects.all()
        # province = self.request.query_params.get('province', None)
        # if province is not None:
        #     queryset = queryset.filter(district__name=province)
        return queryset
