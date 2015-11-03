from rest_framework import serializers
from kompres2015.region.models import Region
from kompres2015.region.models import Province
from kompres2015.region.models import District

class RegionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Region