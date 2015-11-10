from rest_framework import viewsets

from kompres2015.article.models import Article

from kompres2015.article.serializers import ArticleSerializer


class ArticleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    filter_fields = ('title', 'category', 'article', 'author')
