from rest_framework import serializers

from kompres2015.article.models import Article


class ArticleSerializer(serializers.HyperlinkedModelSerializer):
    main_image = serializers.HyperlinkedRelatedField(view_name='article-main-image-detail',
                                                     read_only=True)

    def __init__(self, *args, **kwargs):
        # Instantiate the superclass normally
        super(ArticleSerializer, self).__init__(*args, **kwargs)

        fields = self.context['request'].query_params.get('fields')
        if fields:
            fields = fields.split(',')
            # Drop any fields that are not specified in the `fields` argument.
            allowed = set(fields)
            existing = set(self.fields.keys())
            for field_name in existing - allowed:
                self.fields.pop(field_name)

    class Meta:
        model = Article
        fields = ('id', 'title', 'category', 'author', 'article', 'main_image',
                  'short_description', 'created_date')
