from django.contrib import admin
from kompres2015.region.models import District
from kompres2015.region.models import Province
from kompres2015.region.models import Region


class DistrictAdmin(admin.ModelAdmin):
    pass


class ProvinceAdmin(admin.ModelAdmin):
    pass


class RegionAdmin(admin.ModelAdmin):
    pass

admin.site.register(District, DistrictAdmin)
admin.site.register(Province, ProvinceAdmin)
admin.site.register(Region, RegionAdmin)
