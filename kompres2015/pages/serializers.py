from rest_framework import serializers

from kompres2015.pages.models import FeaturedTravelDestination
from kompres2015.pages.models import FrontPage


class FrontPageSerializer(serializers.ModelSerializer):
    featureds = serializers.HyperlinkedRelatedField(view_name='featured-travel-destination-detail',
                                                    read_only=True, many=True)

    class Meta:
        model = FrontPage
        fields = ('id', 'video', 'featureds')


class FeaturedTravelDestinationSerializer(serializers.ModelSerializer):
    travel_destination = serializers.HyperlinkedRelatedField(view_name='travel-destination-detail',
                                                             read_only=True)
    front_page = serializers.HyperlinkedRelatedField(view_name='front-page-detail',
                                                     read_only=True)

    class Meta:
        model = FeaturedTravelDestination
        fields = ('id', 'travel_destination', 'front_page')

