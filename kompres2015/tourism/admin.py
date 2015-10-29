from django.contrib import admin
from kompres2015.tourism.models import Visit
from kompres2015.tourism.models import TravelDestination


class TravelDestinationAdmin(admin.ModelAdmin):
    pass


class VisitAdmin(admin.ModelAdmin):
    pass

admin.site.register(TravelDestination, TravelDestinationAdmin)
admin.site.register(Visit, VisitAdmin)
