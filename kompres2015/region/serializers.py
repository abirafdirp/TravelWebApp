from rest_framework import serializers
from kompres2015.region.models import Region
from kompres2015.region.models import Province
from kompres2015.region.models import District


class DistrictSerializer(serializers.HyperlinkedModelSerializer):
    region = serializers.HyperlinkedRelatedField(view_name='region-detail',
                                                 source='province.region',
                                                 read_only=True)
    transportations = serializers.HyperlinkedRelatedField(view_name='transportation-detail',
                                                          read_only=True, many=True)

    def __init__(self, *args, **kwargs):
        # Instantiate the superclass normally
        super(DistrictSerializer, self).__init__(*args, **kwargs)

        try:
            fields = self.context['request'].query_params.get('fields')

            if fields:
                fields = fields.split(',')
                # Drop any fields that are not specified in the `fields` argument.
                allowed = set(fields)
                existing = set(self.fields.keys())
                for field_name in existing - allowed:
                    self.fields.pop(field_name)

        except KeyError:
            pass

    class Meta:
        model = District
        fields = ('id', 'name', 'province', 'region', 'latitude', 'longitude', 'transportations')


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


