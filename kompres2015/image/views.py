from rest_framework import viewsets

from kompres2015.image.models import ReportImage
from kompres2015.image.serializers import ReportImageSerializer

from kompres2015.util.views import CreateListRetrieveViewSet


class ReportImageViewSet(CreateListRetrieveViewSet):
    queryset = ReportImage.objects.all()
    filter_fields = ('tag',)
    serializer_class = ReportImageSerializer


class ImageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ReportImage.objects.all()
    filter_fields = ('tag',)
    serializer_class = ReportImageSerializer


class TravelDestinationMainImageViewSet(CreateListRetrieveViewSet):
    queryset = ReportImage.objects.all()
    filter_fields = ('tag',)
    serializer_class = ReportImageSerializer


class ReportImageViewSet(CreateListRetrieveViewSet):
    queryset = ReportImage.objects.all()
    filter_fields = ('tag',)
    serializer_class = ReportImageSerializer


