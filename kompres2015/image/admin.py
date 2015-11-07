from django.contrib import admin

from kompres2015.image.models import ReportImage
from kompres2015.image.models import Image
from kompres2015.image.models import TravelDestinationMainImage
from kompres2015.image.models import TravelDestinationWhatToDoImage
from kompres2015.image.models import TravelDestinationGalleryImage


class ReportImageAdmin(admin.ModelAdmin):
    pass


class ImageAdmin(admin.ModelAdmin):
    pass


class TravelDestinationMainImageAdmin(admin.ModelAdmin):
    pass


class TravelDestinationWhatToDoImageAdmin(admin.ModelAdmin):
    pass


class TravelDestinationGalleryImageAdmin(admin.ModelAdmin):
    pass


admin.site.register(Image, ImageAdmin)
admin.site.register(ReportImage, ReportImageAdmin)
admin.site.register(TravelDestinationMainImage, TravelDestinationMainImageAdmin)
admin.site.register(TravelDestinationWhatToDoImage, TravelDestinationWhatToDoImageAdmin)
admin.site.register(TravelDestinationGalleryImage, TravelDestinationGalleryImageAdmin)

