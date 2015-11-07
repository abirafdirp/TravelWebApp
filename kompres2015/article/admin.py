from django.contrib import admin

from kompres2015.article.models import Article


class ArticleAdmin(admin.ModelAdmin):
    pass


admin.site.register(Article, ArticleAdmin)
