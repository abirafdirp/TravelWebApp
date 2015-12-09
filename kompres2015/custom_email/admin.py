from django.contrib import admin

from kompres2015.custom_email.models import Email


class EmailAdmin(admin.ModelAdmin):
    pass

admin.site.register(Email, EmailAdmin)
