from rest_framework import serializers
from kompres2015.region.models import Region
from kompres2015.region.models import Province
from kompres2015.region.models import District


class DistrictSerializer(serializers.HyperlinkedModelSerializer):
    region = serializers.HyperlinkedRelatedField(view_name='region-detail',
                                                 source='province.region',
                                                 read_only=True)

    class Meta:
        model = District
        fields = ('id', 'name', 'province', 'region', 'latitude', 'longitude')


class ProvinceSerializer(serializers.HyperlinkedModelSerializer):
    districts = serializers.HyperlinkedRelatedField(many=True, read_only=True,
                                                    view_name='district-detail')

    class Meta:
        model = Province
        fields = ('id', 'name', 'districts', 'region', 'latitude', 'longitude')


class RegionSerializer(serializers.HyperlinkedModelSerializer):
    provinces = serializers.HyperlinkedRelatedField(many=True, read_only=True,
                                                    view_name='province-detail')

    class Meta:
        model = Region
        fields = ('id', 'name', 'provinces', 'latitude', 'longitude')


