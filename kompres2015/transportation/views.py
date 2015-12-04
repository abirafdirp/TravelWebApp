from rest_framework import viewsets
from rest_framework import permissions

from kompres2015.transportation.models import Transportation
from kompres2015.transportation.serializers import TransportationSerializer


class TransportationViewSet(viewsets.ReadOnlyModelViewSet):
    filter_fields = ('name',)
    serializer_class = TransportationSerializer

    def get_queryset(self):
        queryset = Transportation.objects.all()
        return queryset
