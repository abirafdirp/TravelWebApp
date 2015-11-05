from rest_framework import serializers
from kompres2015.region.models import Region
from kompres2015.region.models import Province
from kompres2015.region.models import District


class DistrictSerializer(serializers.ModelSerializer):
    class Meta:
        model = District
        fields = ('district_pk_api', 'id', 'name',)


class ProvinceSerializer(serializers.ModelSerializer):
    districts = DistrictSerializer(many=True, read_only=True)

    class Meta:
        model = Province
        fields = ('province_pk_api', 'id', 'name', 'districts')


class RegionSerializer(serializers.ModelSerializer):
    provinces = ProvinceSerializer(many=True, read_only=True)

    class Meta:
        model = Region
        fields = ('region_pk_api', 'id', 'name', 'provinces')


