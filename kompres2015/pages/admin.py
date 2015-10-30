from django.contrib import admin
from kompres2015.pages.models import FrontPage


class FrontPageAdmin(admin.ModelAdmin):
    pass

admin.site.register(FrontPage, FrontPageAdmin)
