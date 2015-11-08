from django.contrib import admin

from django_extensions.admin import ForeignKeyAutocompleteAdmin

from kompres2015.tourism.models import Visit
from kompres2015.tourism.models import TravelDestination


class TravelDestinationAdmin(ForeignKeyAutocompleteAdmin):
    related_search_fields = {
       'district': ('name',),
    }

    fields = ('name', 'district', 'full_description', 'tagline', 'what_to_do',
              'transport_method', 'where_to_stay', 'important_info_contact',)


class VisitAdmin(admin.ModelAdmin):
    pass

admin.site.register(TravelDestination, TravelDestinationAdmin)
admin.site.register(Visit, VisitAdmin)
