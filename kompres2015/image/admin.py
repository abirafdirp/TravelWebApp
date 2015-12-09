from django.contrib import admin

from jet.filters import RelatedFieldAjaxListFilter

from kompres2015.image.models import ReportImage
from kompres2015.image.models import TravelDestinationImage
from kompres2015.image.models import ArticleImage


class ReportImageAdmin(admin.ModelAdmin):
    readonly_fields = ('admin_image',)
    search_fields = ('name', 'tag')
    list_display = ['name', 'user', 'admin_image_list', 'report', 'tag']
    list_filter = (
        ('user', RelatedFieldAjaxListFilter),
    )


class TravelDestinationImageAdmin(admin.ModelAdmin):
    readonly_fields = ('admin_image', 'modified_date')
    search_fields = ('name', 'tag')
    list_display = ['name', 'admin_image_list', 'travel_destination', 'type', 'tag']
    list_filter = (
        ('travel_destination', RelatedFieldAjaxListFilter),
        'type',
    )


class ArticleImageAdmin(admin.ModelAdmin):
    readonly_fields = ('admin_image', 'modified_date')
    search_fields = ('name', 'tag')
    list_display = ['name', 'admin_image_list', 'article', 'type', 'tag']
    list_filter = (
        ('article', RelatedFieldAjaxListFilter),
        'type',
    )

# admin.site.register(Image, ImageAdmin)
admin.site.register(ReportImage, ReportImageAdmin)
admin.site.register(TravelDestinationImage, TravelDestinationImageAdmin)
admin.site.register(ArticleImage, ArticleImageAdmin)

