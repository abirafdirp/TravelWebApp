from rest_framework import viewsets
from rest_framework import permissions

from kompres2015.image.models import ReportImage
from kompres2015.image.models import Image
from kompres2015.image.models import TravelDestinationMainImage
from kompres2015.image.models import TravelDestinationWhatToDoImage
from kompres2015.image.models import TravelDestinationGalleryImage
from kompres2015.image.models import ArticleMainImage

from kompres2015.image.serializers import ReportImageSerializer
from kompres2015.image.serializers import ImageSerializer
from kompres2015.image.serializers import TravelDestinationMainImageSerializer
from kompres2015.image.serializers import TravelDestinationWhatToDoImageSerializer
from kompres2015.image.serializers import TravelDestinationGalleryImageSerializer
from kompres2015.image.serializers import ArticleMainImageSerializer

from kompres2015.util.views import CreateListViewSet


class ReportImageViewSet(CreateListViewSet):
    queryset = ReportImage.objects.all()
    filter_fields = ('tag', 'name')
    serializer_class = ReportImageSerializer
    permission_classes = permissions.IsAuthenticatedOrReadOnly


class ImageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Image.objects.all()
    filter_fields = ('tag', 'name')
    serializer_class = ImageSerializer


class TravelDestinationMainImageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TravelDestinationMainImage.objects.all()
    filter_fields = ('tag', 'name',)
    serializer_class = TravelDestinationMainImageSerializer


class TravelDestinationWhatToDoImageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TravelDestinationWhatToDoImage.objects.all()
    filter_fields = ('tag', 'name',)
    serializer_class = TravelDestinationWhatToDoImageSerializer


class TravelDestinationGalleryImageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TravelDestinationGalleryImage.objects.all()
    filter_fields = ('tag', 'name')
    serializer_class = TravelDestinationGalleryImageSerializer


class ArticleMainImageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ArticleMainImage.objects.all()
    filter_fields = ('tag', 'name')
    serializer_class = ArticleMainImageSerializer
