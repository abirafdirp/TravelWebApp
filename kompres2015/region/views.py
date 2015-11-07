from rest_framework import viewsets

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

        if province is not None:
            queryset = queryset.filter(provinces__name=province)
            return queryset

        if district is not None:
            queryset = queryset.filter(provinces__districts__name=district)
            return queryset

        return queryset


class ProvinceViewSet(viewsets.ReadOnlyModelViewSet):
    filter_fields = ('name',)
    serializer_class = ProvinceSerializer

    def get_queryset(self):
        queryset = Province.objects.all()
        district = self.request.query_params.get('district', None)
        region = self.request.query_params.get('region', None)

        if district is not None:
            queryset = queryset.filter(districts__name=district)
            return queryset

        if region is not None:
            queryset = queryset.filter(region__name=region)
            return queryset

        return queryset


class DistrictViewSet(viewsets.ReadOnlyModelViewSet):
    filter_fields = ('name',)
    serializer_class = DistrictSerializer

    def get_queryset(self):
        queryset = District.objects.all()
        province = self.request.query_params.get('province', None)
        region = self.request.query_params.get('region', None)

        if region is not None:
            queryset = queryset.filter(province__region__name=region)
            return queryset

        if province is not None:
            queryset = queryset.filter(province__name=province)
            return queryset

        return queryset