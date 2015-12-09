from django.contrib import admin

from jet.filters import RelatedFieldAjaxListFilter

from kompres2015.region.models import District
from kompres2015.region.models import Province
from kompres2015.region.models import Region


# 99 must be specified because currently django-jet does not seem to have
# ability to add model from the inline
class DistrictInline(admin.StackedInline):
    model = District
    fk_name = 'province'
    max_num = 99
    extra = 99


class ProvinceInline(admin.StackedInline):
    model = Province
    fk_name = 'region'
    max_num = 99
    extra = 99


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
    inlines = [DistrictInline]


class RegionAdmin(admin.ModelAdmin):
    search_fields = ('name',)
    list_display = ['name', 'latitude', 'longitude', 'get_provinces', 'get_districts']
    list_filter = (
        ('provinces', RelatedFieldAjaxListFilter),
        ('provinces__districts', RelatedFieldAjaxListFilter),
    )
    inlines = [ProvinceInline]

admin.site.register(District, DistrictAdmin)
admin.site.register(Province, ProvinceAdmin)
admin.site.register(Region, RegionAdmin)
