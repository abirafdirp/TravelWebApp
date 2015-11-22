from django.contrib import admin

from kompres2015.article.models import Article

from kompres2015.image.models import ArticleImage


class ArticleImageInline(admin.TabularInline):
    model = ArticleImage


class ArticleAdmin(admin.ModelAdmin):
    inlines = [
        ArticleImageInline,
    ]


admin.site.register(Article, ArticleAdmin)
