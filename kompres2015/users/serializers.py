from rest_framework import serializers
from rest_auth.serializers import UserDetailsSerializer

from kompres2015.users.models import User
from kompres2015.region.models import District


class UserSerializer(serializers.HyperlinkedModelSerializer):
    reports = serializers.HyperlinkedRelatedField(many=True, view_name='report-detail', read_only=True)
    district = serializers.HyperlinkedRelatedField(source="userprofile.district", view_name='district-detail',
                                                   queryset=District.objects.all())

    class Meta:
        model = User
        fields = ('id', 'username', 'name', 'reports', 'district')


class UserRestSerializer(UserDetailsSerializer):

    district = serializers.HyperlinkedRelatedField(source="userprofile.district", view_name='district-detail',
                                                   queryset=District.objects.all())

    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + ('district', 'shadow_banned',)

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('userprofile', {})
        district = profile_data.get('district')

        instance = super(UserRestSerializer, self).update(instance, validated_data)

        # get and update user profile
        profile = instance.userprofile
        if profile_data and district:
            profile.district = district
            profile.save()
        return instance
