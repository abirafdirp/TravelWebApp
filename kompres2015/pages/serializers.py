from rest_framework import serializers

from kompres2015.pages.models import FeaturedTravelDestination
from kompres2015.pages.models import HomePage


class HomePageSerializer(serializers.ModelSerializer):
    featureds = serializers.HyperlinkedRelatedField(view_name='featured-travel-destination-detail',
                                                    read_only=True, many=True)

    class Meta:
        model = HomePage
        fields = ('id', 'video', 'featureds', 'image')


class FeaturedTravelDestinationSerializer(serializers.ModelSerializer):
    travel_destination = serializers.HyperlinkedRelatedField(view_name='travel-destination-detail',
                                                             read_only=True)
    front_page = serializers.HyperlinkedRelatedField(view_name='home-page-detail',
                                                     read_only=True)

    class Meta:
        model = FeaturedTravelDestination
        fields = ('id', 'travel_destination', 'front_page')

