from rest_framework import serializers
from kompres2015.image.models import ReportImage
from kompres2015.image.models import Image
from kompres2015.image.models import TravelDestinationMainImage
from kompres2015.image.models import TravelDestinationWhatToDoImage
from kompres2015.image.models import TravelDestinationGalleryImage
from kompres2015.image.models import ArticleMainImage


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ('id', 'name', 'image', 'tag')


class ReportImageSerializer(serializers.ModelSerializer):
    travel_destination = serializers.HyperlinkedRelatedField(view_name='travel-destination-detail',
                                                             read_only=True)

    class Meta:
        model = ReportImage
        fields = ('id', 'name', 'image', 'tag', 'travel_destination')


class TravelDestinationMainImageSerializer(serializers.ModelSerializer):
    travel_destination = serializers.HyperlinkedRelatedField(view_name='travel-destination-detail',
                                                             read_only=True)

    class Meta:
        model = TravelDestinationMainImage
        fields = ('id', 'name', 'image', 'tag', 'travel_destination')


class TravelDestinationWhatToDoImageSerializer(serializers.ModelSerializer):
    travel_destination = serializers.HyperlinkedRelatedField(view_name='travel-destination-detail',
                                                             read_only=True)

    class Meta:
        model = TravelDestinationWhatToDoImage
        fields = ('id', 'name', 'image', 'tag', 'travel_destination')


class TravelDestinationGalleryImageSerializer(serializers.ModelSerializer):
    travel_destination = serializers.HyperlinkedRelatedField(view_name='travel-destination-detail',
                                                             read_only=True)

    class Meta:
        model = TravelDestinationGalleryImage
        fields = ('id', 'name', 'image', 'tag', 'travel_destination')


class ArticleMainImageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ArticleMainImage
        fields = ('id', 'name', 'image', 'tag')