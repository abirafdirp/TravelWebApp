from rest_framework import serializers
from kompres2015.image.models import ReportImage
from kompres2015.image.models import Image
from kompres2015.image.models import TravelDestinationImage
from kompres2015.image.models import ArticleImage

from kompres2015.tourism.models import Report


class ImageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Image
        fields = ('id', 'name', 'tag')


class ReportImageSerializer(serializers.HyperlinkedModelSerializer):
    report = serializers.HyperlinkedRelatedField(view_name='report-detail',
                                                 queryset=Report.objects.all())
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = ReportImage
        fields = ('id', 'name', 'report', 'image', 'tag', 'user')


class TravelDestinationImageSerializer(serializers.HyperlinkedModelSerializer):
    travel_destination = serializers.HyperlinkedRelatedField(view_name='travel-destination-detail',
                                                             read_only=True)

    class Meta:
        model = TravelDestinationImage
        fields = ('id', 'name', 'image', 'tag', 'type', 'travel_destination',)


class ArticleImageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ArticleImage
        fields = ('id', 'name', 'image', 'tag', 'type',)