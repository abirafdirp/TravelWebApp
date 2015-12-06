from django.contrib import admin

from kompres2015.image.models import ReportImage
from kompres2015.image.models import Image
from kompres2015.image.models import TravelDestinationImage
from kompres2015.image.models import ArticleImage


class ReportImageAdmin(admin.ModelAdmin):
    readonly_fields = ('admin_image',)

    def admin_image(self, obj):
        return '<img src="%s"/>' % obj.image.url
    admin_image.allow_tags = True
    admin_image.short_description = 'Preview'


class ImageAdmin(admin.ModelAdmin):
    readonly_fields = ('admin_image',)

    def admin_image(self, obj):
        return '<img src="%s" style="max-width: 400px; width: 100%%;"/>' % obj.image.url
    admin_image.allow_tags = True
    admin_image.short_description = 'Preview'


class TravelDestinationImageAdmin(admin.ModelAdmin):
    readonly_fields = ('admin_image',)

    def admin_image(self, obj):
        return '<img src="%s" style="max-width: 400px; width: 100%%;"/>' % obj.image.url
    admin_image.allow_tags = True
    admin_image.short_description = 'Preview'


class ArticleImageAdmin(admin.ModelAdmin):
    readonly_fields = ('admin_image',)

    def admin_image(self, obj):
        return '<img src="%s" style="max-width: 400px; width: 100%%;"/>' % obj.image.url
    admin_image.allow_tags = True
    admin_image.short_description = 'Preview'

admin.site.register(Image, ImageAdmin)
admin.site.register(ReportImage, ReportImageAdmin)
admin.site.register(TravelDestinationImage, TravelDestinationImageAdmin)
admin.site.register(ArticleImage, ArticleImageAdmin)

