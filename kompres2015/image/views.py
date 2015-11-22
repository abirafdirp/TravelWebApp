from rest_framework import viewsets
from rest_framework import permissions

from kompres2015.image.models import ReportImage
from kompres2015.image.models import Image
from kompres2015.image.models import TravelDestinationImage
from kompres2015.image.models import ArticleImage

from kompres2015.image.serializers import ReportImageSerializer
from kompres2015.image.serializers import ImageSerializer
from kompres2015.image.serializers import TravelDestinationImageSerializer
from kompres2015.image.serializers import ArticleImageSerializer

from kompres2015.util.views import CreateListViewSet


class ReportImageViewSet(CreateListViewSet):
    queryset = ReportImage.objects.all()
    filter_fields = ('tag', 'name')
    serializer_class = ReportImageSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ImageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Image.objects.all()
    filter_fields = ('tag', 'name')
    serializer_class = ImageSerializer


class TravelDestinationImageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TravelDestinationImage.objects.all()
    filter_fields = ('tag', 'name', 'type',)
    serializer_class = TravelDestinationImageSerializer


class ArticleImageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ArticleImage.objects.all()
    filter_fields = ('tag', 'name', 'type',)
    serializer_class = ArticleImageSerializer
