import json

from django.http import JsonResponse
from django.core.exceptions import ObjectDoesNotExist

from rest_framework import viewsets
from rest_framework import permissions

from kompres2015.tourism.models import TravelDestination
from kompres2015.tourism.models import Visit
from kompres2015.tourism.models import Report
from kompres2015.tourism.models import TravelDestinationContent

from kompres2015.tourism.serializers import TravelDestinationSerializer
from kompres2015.tourism.serializers import VisitSerializer
from kompres2015.tourism.serializers import ReportSerializer
from kompres2015.tourism.serializers import TravelDestinationContentSerializer

from kompres2015.util.views import CreateListRetrieveViewSet


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


class ReportViewSet(CreateListRetrieveViewSet):
    serializer_class = ReportSerializer
    filter_fields = ('report', )
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        queryset = Report.objects.all()
        username = self.request.query_params.get('username', None)

        if username is not None:
            queryset = queryset.filter(user__username=username)
            return queryset

        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class TravelDestinationContentViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = TravelDestinationContentSerializer
    filter_fields = ('name', )

    def get_queryset(self):
        queryset = TravelDestinationContent.objects.all()
        travel_destination = self.request.query_params.get('travel_destination', None)

        if travel_destination is not None:
            queryset = queryset.filter(travel_destination__name=travel_destination)
            return queryset

        return queryset


def model_3d_view(request, travel_destination_name):
    travel_destination_name = travel_destination_name.replace('-', ' ')
    try:
        travel_destination = TravelDestination.objects.get(name=travel_destination_name)
    except ObjectDoesNotExist:
        return JsonResponse({'errors': 'travel destination does not exist'})
    file = open(travel_destination.model_3d.path, 'r')
    text = file.read().replace('\n', ' ')
    jsonned = json.loads(text)
    file.close()
    return JsonResponse(jsonned)