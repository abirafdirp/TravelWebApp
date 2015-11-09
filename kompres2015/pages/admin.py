from django.contrib import admin
from kompres2015.pages.models import HomePage
from kompres2015.pages.models import FeaturedTravelDestination


class FrontPageAdmin(admin.ModelAdmin):
    pass


class FeaturedTravelDestinationAdmin(admin.ModelAdmin):
    pass


admin.site.register(HomePage, FrontPageAdmin)
admin.site.register(FeaturedTravelDestination, FeaturedTravelDestinationAdmin)