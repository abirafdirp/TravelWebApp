from django.contrib import admin
from kompres2015.pages.models import Page
from kompres2015.pages.models import FeaturedTravelDestination
from kompres2015.pages.models import HomeLink


class HomeLinkInline(admin.StackedInline):
    model = HomeLink
    max_num = 9
    extra = 9
    readonly_fields = ('admin_image', 'modified_date')


class PageAdmin(admin.ModelAdmin):
    inlines = [HomeLinkInline]
    readonly_fields = ('admin_image1', 'admin_image2',  'modified_date')


admin.site.register(Page, PageAdmin)