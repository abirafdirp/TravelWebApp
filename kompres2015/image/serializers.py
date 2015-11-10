from rest_framework import serializers
from kompres2015.image.models import ReportImage
from kompres2015.image.models import Image
from kompres2015.image.models import TravelDestinationMainImage
from kompres2015.image.models import TravelDestinationWhatToDoImage
from kompres2015.image.models import TravelDestinationGalleryImage
from kompres2015.image.models import ArticleMainImage

from kompres2015.tourism.models import Report


class ImageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Image
        fields = ('id', 'name', 'image', 'tag')


class ReportImageSerializer(serializers.HyperlinkedModelSerializer):
    report = serializers.HyperlinkedRelatedField(view_name='report-detail',
                                                 queryset=Report.objects.all())

    class Meta:
        model = ReportImage
        fields = ('id', 'name', 'report', 'image', 'tag')


class TravelDestinationMainImageSerializer(serializers.HyperlinkedModelSerializer):
    travel_destination = serializers.HyperlinkedRelatedField(view_name='travel-destination-detail',
                                                             read_only=True)

    class Meta:
        model = TravelDestinationMainImage
        fields = ('id', 'name', 'image', 'tag', 'travel_destination')


class TravelDestinationWhatToDoImageSerializer(serializers.HyperlinkedModelSerializer):
    travel_destination = serializers.HyperlinkedRelatedField(view_name='travel-destination-detail',
                                                             read_only=True)

    class Meta:
        model = TravelDestinationWhatToDoImage
        fields = ('id', 'name', 'image', 'tag', 'travel_destination')


class TravelDestinationGalleryImageSerializer(serializers.HyperlinkedModelSerializer):
    travel_destination = serializers.HyperlinkedRelatedField(view_name='travel-destination-detail',
                                                             read_only=True)

    class Meta:
        model = TravelDestinationGalleryImage
        fields = ('id', 'name', 'image', 'tag', 'travel_destination')


class ArticleMainImageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ArticleMainImage
        fields = ('id', 'name', 'image', 'tag')