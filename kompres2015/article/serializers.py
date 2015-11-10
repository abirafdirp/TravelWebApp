from rest_framework import serializers

from kompres2015.article.models import Article


class ArticleSerializer(serializers.HyperlinkedModelSerializer):
    main_image = serializers.HyperlinkedRelatedField(view_name='article-main-image-detail',
                                                     read_only=True)

    class Meta:
        model = Article
        fields = ('id', 'title', 'category', 'author', 'article', 'main_image')
