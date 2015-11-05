from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.filters import DjangoFilterBackend

from kompres2015.region.models import Region
from kompres2015.region.models import Province
from kompres2015.region.models import District

from kompres2015.region.serializers import RegionSerializer
from kompres2015.region.serializers import ProvinceSerializer
from kompres2015.region.serializers import DistrictSerializer


class RegionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Region.objects.all()
    filter_fields = ('name',)
    serializer_class = RegionSerializer

    def get_queryset(self):
        queryset = Region.objects.all()
        province = self.request.query_params.get('province', None)
        if province is not None:
            queryset = queryset.filter(provinces__name=province)
        return queryset


class ProvinceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Province.objects.all()
    serializer_class = ProvinceSerializer


class DistrictViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = District.objects.all()
    serializer_class = DistrictSerializer


@api_view(('GET',))
def api_root(request, format=None):
    return Response({
        'regions': reverse('region-list', request=request, format=format),
        'provinces': reverse('province-list', request=request, format=format),
        'districts': reverse('district-list', request=request, format=format),
    })
