from django import template
from django.conf import settings

register = template.Library()


@register.simple_tag
def fb_clientid():
    return settings.FB_CLIENTID


@register.simple_tag
def gmaps_token():
    return settings.GMAPS_TOKEN
