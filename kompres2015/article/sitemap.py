from django.contrib.sitemaps import Sitemap
from kompres2015.article.models import Article


class ArticleSitemap(Sitemap):
    changefreq = "yearly"
    priority = 0.5

    def items(self):
        return Article.objects.all()

    def lastmod(self, obj):
        return obj.modified_date

    def location(self, obj):
        return '/artikel/' + obj.title.lower().replace(' ','-')