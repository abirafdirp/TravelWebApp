from django.contrib import admin
from kompres2015.pages.models import Page
from kompres2015.pages.models import FeaturedTravelDestination
from kompres2015.pages.models import HomeLink


class HomeLinkInline(admin.TabularInline):
    model = HomeLink


class PageAdmin(admin.ModelAdmin):
    inlines = [HomeLinkInline]


class FeaturedTravelDestinationAdmin(admin.ModelAdmin):
    pass


admin.site.register(Page, PageAdmin)
admin.site.register(FeaturedTravelDestination, FeaturedTravelDestinationAdmin)