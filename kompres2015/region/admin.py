from django.contrib import admin

from jet.filters import RelatedFieldAjaxListFilter

from kompres2015.region.models import District
from kompres2015.region.models import Province
from kompres2015.region.models import Region


class DistrictAdmin(admin.ModelAdmin):
    search_fields = ('name',)
    list_display = ['name', 'latitude', 'longitude', 'province', 'get_region']
    list_filter = (
        ('province', RelatedFieldAjaxListFilter),
        ('province__region', RelatedFieldAjaxListFilter),
    )


class ProvinceAdmin(admin.ModelAdmin):
    search_fields = ('name',)
    list_display = ['name', 'latitude', 'longitude', 'region', 'get_districts']
    list_filter = (
        ('region', RelatedFieldAjaxListFilter),
        ('districts', RelatedFieldAjaxListFilter),
    )


class RegionAdmin(admin.ModelAdmin):
    search_fields = ('name',)
    list_display = ['name', 'latitude', 'longitude', 'get_provinces', 'get_districts']
    list_filter = (
        ('provinces', RelatedFieldAjaxListFilter),
        ('provinces__districts', RelatedFieldAjaxListFilter),
    )

admin.site.register(District, DistrictAdmin)
admin.site.register(Province, ProvinceAdmin)
admin.site.register(Region, RegionAdmin)
