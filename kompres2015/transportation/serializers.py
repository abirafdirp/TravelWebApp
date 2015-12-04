from rest_framework import serializers

from kompres2015.transportation.models import Transportation


class TransportationSerializer(serializers.HyperlinkedModelSerializer):
    districts = serializers.HyperlinkedRelatedField(view_name='district-detail',
                                                    read_only=True, many=True)

    class Meta:
        model = Transportation
        fields = ('id', 'name', 'districts', 'description', 'website')