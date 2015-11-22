from django.contrib import admin

from kompres2015.image.models import ReportImage
from kompres2015.image.models import Image
from kompres2015.image.models import TravelDestinationImage
from kompres2015.image.models import ArticleImage


class ReportImageAdmin(admin.ModelAdmin):
    pass


class ImageAdmin(admin.ModelAdmin):
    pass


class TravelDestinationImageAdmin(admin.ModelAdmin):
    pass


class ArticleImageAdmin(admin.ModelAdmin):
    pass

admin.site.register(Image, ImageAdmin)
admin.site.register(ReportImage, ReportImageAdmin)
admin.site.register(TravelDestinationImage, TravelDestinationImageAdmin)
admin.site.register(ArticleImage, ArticleImageAdmin)

