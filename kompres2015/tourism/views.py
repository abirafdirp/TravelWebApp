from rest_framework import viewsets

from kompres2015.tourism.models import TravelDestination
from kompres2015.tourism.models import Visit
from kompres2015.tourism.models import Report

from kompres2015.tourism.serializers import TravelDestinationSerializer
from kompres2015.tourism.serializers import VisitSerializer
from kompres2015.tourism.serializers import ReportSerializer

from kompres2015.util.views import CreateListViewSet

class TravelDestinationViewSet(viewsets.ReadOnlyModelViewSet):
    filter_fields = ('name',)
    serializer_class = TravelDestinationSerializer

    def get_queryset(self):
        queryset = TravelDestination.objects.all()
        district = self.request.query_params.get('district', None)
        province = self.request.query_params.get('province', None)
        region = self.request.query_params.get('region', None)

        if district is not None:
            queryset = queryset.filter(district__name=district)
            return queryset

        if region is not None:
            queryset = queryset.filter(district__province__region__name=region)
            return queryset

        if province is not None:
            queryset = queryset.filter(district__province__name=province)

        return queryset


class VisitViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = VisitSerializer

    def get_queryset(self):
        queryset = Visit.objects.all()
        username = self.request.query_params.get('username', None)

        if username is not None:
            queryset = queryset.filter(user__username=username)
            return queryset
        return queryset


class ReportViewSet(CreateListViewSet):
    serializer_class = ReportSerializer
    filter_fields = ('report', )

    def get_queryset(self):
        queryset = Report.objects.all()
        username = self.request.query_params.get('username', None)

        if username is not None:
            queryset = queryset.filter(user__username=username)
            return queryset

        return queryset
