from rest_framework import serializers
from kompres2015.pages.models import FrontPage

class FrontPageSerializer(serializers.ModelSerializer):

    class Meta:
        model = FrontPage
