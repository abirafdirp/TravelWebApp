from django.contrib import admin
from kompres2015.pariwisata.models import LokasiWisata

# Register your models here.
class LokasiWisataAdmin(admin.ModelAdmin):
    pass

admin.site.register(LokasiWisata,LokasiWisataAdmin)