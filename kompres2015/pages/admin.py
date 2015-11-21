from django.contrib import admin
from kompres2015.pages.models import Page
from kompres2015.pages.models import FeaturedTravelDestination


class PageAdmin(admin.ModelAdmin):
    pass


class FeaturedTravelDestinationAdmin(admin.ModelAdmin):
    pass


admin.site.register(Page, PageAdmin)
admin.site.register(FeaturedTravelDestination, FeaturedTravelDestinationAdmin)