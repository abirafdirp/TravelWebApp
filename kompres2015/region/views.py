from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse

from django.db.models import Q

from kompres2015.region.models import Region
from kompres2015.region.models import Province
from kompres2015.region.models import District

from kompres2015.region.serializers import RegionSerializer
from kompres2015.region.serializers import ProvinceSerializer
from kompres2015.region.serializers import DistrictSerializer


class RegionViewSet(viewsets.ReadOnlyModelViewSet):
    filter_fields = ('name',)
    serializer_class = RegionSerializer

    def get_queryset(self):
        queryset = Region.objects.all()
        province = self.request.query_params.get('province', None)
        district = self.request.query_params.get('district', None)
        if province is not None and district is not None:
            queryset = queryset.filter(provinces__name=province,
                                       provinces__districts__name=district)
            return queryset
        if province is not None:
            queryset = queryset.filter(provinces__name__contains='%')
        if district is not None:
            queryset = queryset.filter(provinces__districts__name=district)
        return queryset


class ProvinceViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ProvinceSerializer

    def get_queryset(self):
        queryset = Province.objects.all()
        district = self.request.query_params.get('district', None)
        region = self.request.query_params.get('region', None)
        if region is not None and district is not None:
            queryset = queryset.filter(region__name=region,
                                       districts__name=district)
            return queryset
        if district is not None:
            queryset = queryset.filter(districts__name=district)
        if region is not None:
            queryset = queryset.filter(region__name=region)
        return queryset


class DistrictViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = DistrictSerializer

    def get_queryset(self):
        queryset = District.objects.all()
        province = self.request.query_params.get('province', None)
        region = self.request.query_params.get('region', None)
        if province is not None and region is not None:
            queryset = queryset.filter(province__region__name=region,
                                       province__name=province)
            return queryset
        if region is not None:
            queryset = queryset.filter(province__region__name=region)
        if province is not None:
            queryset = queryset.filter(district__name=province)
        return queryset


@api_view(('GET',))
def api_root(request, format=None):
    return Response({
        'regions': reverse('region-list', request=request, format=format),
        'provinces': reverse('province-list', request=request, format=format),
        'districts': reverse('district-list', request=request, format=format),
        'travel destinations': reverse('travel-destination-list', request=request, format=format),
        'visits': reverse('visit-list', request=request, format=format),
    })
