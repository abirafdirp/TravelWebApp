from django.contrib import admin

from jet.filters import RelatedFieldAjaxListFilter

from kompres2015.transportation.models import Transportation


class TransportationAdmin(admin.ModelAdmin):
    readonly_fields = ('admin_image', 'modified_date')

    list_display = ['name', 'link_it', 'get_districts']

    list_filter = (
        ('districts', RelatedFieldAjaxListFilter),
    )

    search_fields = ['name']

admin.site.register(Transportation, TransportationAdmin)
