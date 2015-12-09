from django.contrib import admin

from jet.filters import RelatedFieldAjaxListFilter

from kompres2015.tourism.models import Visit
from kompres2015.tourism.models import TravelDestination
from kompres2015.tourism.models import TravelDestinationContent
from kompres2015.tourism.models import Report

from kompres2015.image.models import TravelDestinationImage
from kompres2015.image.models import ReportImage


class ReportImagesInline(admin.StackedInline):
    model = ReportImage
    can_delete = False
    extra = 0

    readonly_fields = ('admin_image', 'modified_date')


class TravelDestinationContentInline(admin.StackedInline):
    model = TravelDestinationContent
    max_num = 4
    extra = 4
    verbose_name_plural = 'Konten-konten Lokasi Wisata'
    readonly_fields = ('modified_date',)


class TravelDestinationImageInline(admin.StackedInline):
    model = TravelDestinationImage
    max_num = 20
    extra = 20
    verbose_name_plural = 'Foto-foto Lokasi Wisata'

    readonly_fields = ('admin_image', 'modified_date')


class ReportAdmin(admin.ModelAdmin):
    inlines = [ReportImagesInline]
    list_display = ['get_username', 'category', 'get_date',
                    'get_travel_destination', 'approved', 'get_image_count']

    list_filter = (
        ('user', RelatedFieldAjaxListFilter),
        ('travel_destination', RelatedFieldAjaxListFilter),
        'category',
        'created_date',
        'approved',
    )

    def get_image_count(self, obj):
        return obj.images.count()

    get_image_count.short_description = 'Jumlah Foto'

    def get_username(self, obj):
        return obj.user.username

    get_username.admin_order_field = 'user__username'
    get_username.short_description = 'Username'

    def get_date(self, obj):
        return obj.created_date

    get_date.admin_order_field = 'created_date'
    get_date.short_description = 'Tanggal Komplain'

    def get_travel_destination(self, obj):
        return obj.travel_destination.name

    get_travel_destination.admin_order_field = 'travel_destination__name'
    get_travel_destination.short_description = 'Lokasi Wisata'


class TravelDestinationAdmin(admin.ModelAdmin):
    inlines = [
        TravelDestinationContentInline,
        TravelDestinationImageInline,
    ]

    readonly_fields = ('modified_date',)
    search_fields = ['name']

    list_display = ['name', 'type', 'district', 'get_province']

    list_filter = (
        ('district', RelatedFieldAjaxListFilter),
        ('district__province', RelatedFieldAjaxListFilter),
        ('district__province__region', RelatedFieldAjaxListFilter),
        'type',
    )

    def get_province(self, obj):
        return obj.district.province.name

    get_province.admin_order_field = 'name'
    get_province.short_description = 'Provinsi'


class VisitAdmin(admin.ModelAdmin):
    pass

admin.site.register(TravelDestination, TravelDestinationAdmin)
admin.site.register(Visit, VisitAdmin)
admin.site.register(Report, ReportAdmin)
