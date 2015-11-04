from rest_framework import serializers
from kompres2015.image.models import Image

class ImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Image
