# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin
from django.views.generic import TemplateView
from django.views import defaults as default_views

from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns

from kompres2015.region.views import RegionViewSet
from kompres2015.region.views import ProvinceViewSet
from kompres2015.region.views import DistrictViewSet
from kompres2015.region.views import api_root

from kompres2015.tourism.views import TravelDestinationViewSet
from kompres2015.tourism.views import VisitViewSet

urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name='pages/home.html'), name="home"),
    url(r'^about/$', TemplateView.as_view(template_name='pages/about.html'), name="about"),

    # Django Admin, use {% url 'admin:index' %}
    url(settings.ADMIN_URL, include(admin.site.urls)),

    # User management
    url(r'^users/', include("kompres2015.users.urls", namespace="users")),
    url(r'^accounts/', include('allauth.urls')),

    # Your stuff: custom urls includes go here

    # django-fluent-comments custom view
    url(r'^comments/', include('fluent_comments.urls')),


] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    # This allows the error pages to be debugged during development, just visit
    # these url in browser to see how these error pages look like.
    urlpatterns += [
        url(r'^400/$', default_views.bad_request),
        url(r'^403/$', default_views.permission_denied),
        url(r'^404/$', default_views.page_not_found),
        url(r'^500/$', default_views.server_error),
    ]

# DRF default router
# router = routers.DefaultRouter()
# router.register(r'regions', views.RegionViewSet)
# router.register(r'provinces', views.ProvinceViewSet)
# router.register(r'districts', views.DistrictViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns += [
    # url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]

region_list = RegionViewSet.as_view({
    'get': 'list',
})
region_detail = RegionViewSet.as_view({
    'get': 'retrieve',
})
province_list = ProvinceViewSet.as_view({
    'get': 'list',
})
province_detail = ProvinceViewSet.as_view({
    'get': 'retrieve',
})
district_list = DistrictViewSet.as_view({
    'get': 'list',
})
district_detail = DistrictViewSet.as_view({
    'get': 'retrieve',
})
travel_destination_list = TravelDestinationViewSet.as_view({
    'get': 'list',
})
travel_destination_detail = TravelDestinationViewSet.as_view({
    'get': 'retrieve',
})
visit_list = VisitViewSet.as_view({
    'get': 'list',
})
visit_detail = VisitViewSet.as_view({
    'get': 'retrieve',
})

urlpatterns += format_suffix_patterns([
    url(r'^api/$', api_root),
    url(r'^api/regions/$', region_list, name='region-list'),
    url(r'^api/regions/(?P<pk>[0-9]+)/$', region_detail, name='region-detail'),
    url(r'^api/provinces/$', province_list, name='province-list'),
    url(r'^api/provinces/(?P<pk>[0-9]+)/$', province_detail, name='province-detail'),
    url(r'^api/districts/$', district_list, name='district-list'),
    url(r'^api/districts/(?P<pk>[0-9]+)/$', district_detail, name='district-detail'),
    url(r'^api/traveldestinations/$', travel_destination_list, name='travel-destination-list'),
    url(r'^api/traveldestinations/(?P<pk>[0-9]+)/$', travel_destination_detail, name='travel-destination-detail'),
    url(r'^api/visits/$', visit_list, name='visit-list'),
    url(r'^api/visits/(?P<pk>[0-9]+)/$', visit_detail, name='visit-detail'),
])