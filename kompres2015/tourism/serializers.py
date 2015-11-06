from rest_framework import serializers
from kompres2015.tourism.models import TravelDestination
from kompres2015.tourism.models import Visit


class TravelDestinationSerializer(serializers.HyperlinkedModelSerializer):
    # district = serializers.HyperlinkedRelatedField(view_name='district-detail',
    #                                                read_only=True)
    visits = serializers.HyperlinkedRelatedField(view_name='visit detail',
                                                 read_only=True, many=True)

    class Meta:
        model = TravelDestination
        fields = ('name', 'full_description', 'tagline', 'what_to_do',
                  'transport_method', 'where_to_stay', 'important_info_contact',
                  'visits')


class VisitSerializer(serializers.HyperlinkedModelSerializer):
    travel_destination = serializers.HyperlinkedRelatedField(view_name='travel-destination-detial',
                                                                read_only=True)

    class Meta:
        model = Visit
        fields = ('date', 'travel_destination')

