from django.contrib import admin

from django_extensions.admin import ForeignKeyAutocompleteAdmin

from kompres2015.transportation.models import Transportation


class TransportationAdmin(admin.ModelAdmin):
    pass

admin.site.register(Transportation, TransportationAdmin)
