from django.contrib import admin

from django_extensions.admin import ForeignKeyAutocompleteAdmin

from kompres2015.tourism.models import Visit
from kompres2015.tourism.models import TravelDestination
from kompres2015.tourism.models import TravelDestinationContent
from kompres2015.tourism.models import Report


class TravelDestinationContentInline(admin.TabularInline):
    model = TravelDestinationContent


class ReportInline(admin.TabularInline):
    model = Report


class ReportAdmin(admin.ModelAdmin):
    pass


class TravelDestinationAdmin(ForeignKeyAutocompleteAdmin):
    related_search_fields = {
       'district': ('name',),
    }

    fields = ('name', 'district', 'full_description', 'tagline',)

    inlines = [
        TravelDestinationContentInline,
        ReportInline,
    ]


class VisitAdmin(admin.ModelAdmin):
    pass

admin.site.register(TravelDestination, TravelDestinationAdmin)
admin.site.register(Visit, VisitAdmin)
admin.site.register(Report, ReportAdmin)
