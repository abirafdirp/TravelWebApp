from rest_framework import serializers
from kompres2015.tourism.models import TravelDestination
from kompres2015.tourism.models import Visit


class TravelDestinationSerializer(serializers.ModelSerializer):

    class Meta:
        model = TravelDestination


class VisitSerializer(serializers.ModelSerializer):

    class Meta:
        model = Visit

