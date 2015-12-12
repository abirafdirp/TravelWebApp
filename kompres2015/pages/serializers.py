from rest_framework import serializers

from kompres2015.pages.models import FeaturedTravelDestination
from kompres2015.pages.models import Page
from kompres2015.pages.models import HomeLink


class PageSerializer(serializers.ModelSerializer):
    featureds = serializers.HyperlinkedRelatedField(view_name='featured-travel-destination-detail',
                                                    read_only=True, many=True)
    homelinks = serializers.HyperlinkedRelatedField(view_name='home-link-detail',
                                                    read_only=True, many=True)

    class Meta:
        model = Page
        fields = ('id', 'video', 'video_start', 'featureds', 'travel_destination_list_image', 'article_list_image',
                  'article_list_tagline', 'travel_destination_list_tagline', 'homelinks')


class FeaturedTravelDestinationSerializer(serializers.ModelSerializer):
    travel_destination = serializers.HyperlinkedRelatedField(view_name='travel-destination-detail',
                                                             read_only=True)
    front_page = serializers.HyperlinkedRelatedField(view_name='page-detail',
                                                     read_only=True)

    class Meta:
        model = FeaturedTravelDestination
        fields = ('id', 'travel_destination', 'front_page')


class HomeLinkSerializer(serializers.ModelSerializer):
    page = serializers.HyperlinkedRelatedField(view_name='page-detail', read_only=True)

    class Meta:
        model = HomeLink
        fields = ('id', 'image', 'title', 'link', 'page', 'description', 'type')

