from django.contrib import admin

from kompres2015.article.models import Article

from kompres2015.image.models import ArticleImage


class ArticleImageInline(admin.TabularInline):
    readonly_fields = ('admin_image',)
    model = ArticleImage


class ArticleAdmin(admin.ModelAdmin):
    inlines = [
        ArticleImageInline,
    ]
    list_filter = (
        'category',
        'author',
        'date'
    )
    list_display = [
        'title',
        'category',
        'date',
        'author'
    ]
    search_fields = ['title']


admin.site.register(Article, ArticleAdmin)
