from rest_framework import serializers
from kompres2015.region.models import Region
from kompres2015.region.models import Province
from kompres2015.region.models import District


class RegionSerializer(serializers.HyperlinkedModelSerializer):
    provinces = serializers.HyperlinkedRelatedField(many=True, read_only=True)

    class Meta:
        model = Region
        fields = ('name', 'provinces')


class ProvinceSerializer(serializers.HyperlinkedModelSerializer):
    districts = serializers.HyperlinkedRelatedField(many=True, read_only=True)
    region = serializers.HyperlinkedIdentityField(read_only=True)

    class Meta:
        model = Province
        fields = ('region', 'name', 'districts')


class DistrictSerializer(serializers.HyperlinkedModelSerializer):
    province = serializers.HyperlinkedIdentityField(read_only=True)

    class Meta:
        model = District
        fields = ('name', 'province')
