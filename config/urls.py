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

from kompres2015.util.views import api_root

from kompres2015.tourism.views import TravelDestinationViewSet
from kompres2015.tourism.views import VisitViewSet
from kompres2015.tourism.views import ReportViewSet

from kompres2015.users.views import UserViewSet

from kompres2015.image.views import ReportImageViewSet
from kompres2015.image.views import ImageViewSet
from kompres2015.image.views import TravelDestinationMainImageViewSet
from kompres2015.image.views import TravelDestinationWhatToDoImageViewSet
from kompres2015.image.views import TravelDestinationGalleryImageViewSet
from kompres2015.image.views import ArticleMainImageViewSet

from kompres2015.pages.views import FrontPageViewSet
from kompres2015.pages.views import FeaturedTravelDestinationViewSet

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
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api/docs/', include('rest_framework_swagger.urls'))
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
report_list = ReportViewSet.as_view({
    'get': 'list',
})
report_detail = ReportViewSet.as_view({
    'get': 'retrieve',
})
user_list = UserViewSet.as_view({
    'get': 'list',
})
user_detail = UserViewSet.as_view({
    'get': 'retrieve',
})
report_image_list = ReportImageViewSet.as_view({
    'get': 'list',
})
report_image_detail = ReportImageViewSet.as_view({
    'get': 'retrieve',
})
image_list = ImageViewSet.as_view({
    'get': 'list',
})
image_detail = ImageViewSet.as_view({
    'get': 'retrieve',
})
article_main_image_list = ArticleMainImageViewSet.as_view({
    'get': 'list',
})
article_main_image_detail = ArticleMainImageViewSet.as_view({
    'get': 'retrieve',
})
travel_destination_main_image_list = TravelDestinationMainImageViewSet.as_view({
    'get': 'list',
})
travel_destination_main_image_detail = TravelDestinationMainImageViewSet.as_view({
    'get': 'retrieve',
})
travel_destination_what_to_do_image_list = TravelDestinationWhatToDoImageViewSet.as_view({
    'get': 'list',
})
travel_destination_what_to_do_image_detail = TravelDestinationWhatToDoImageViewSet.as_view({
    'get': 'retrieve',
})
travel_destination_gallery_image_list = TravelDestinationGalleryImageViewSet.as_view({
    'get': 'list',
})
travel_destination_gallery_image_detail = TravelDestinationGalleryImageViewSet.as_view({
    'get': 'retrieve',
})
front_page_list = FrontPageViewSet.as_view({
    'get': 'list',
})
front_page_detail = FrontPageViewSet.as_view({
    'get': 'retrieve',
})
featured_travel_destination_list = FeaturedTravelDestinationViewSet.as_view({
    'get': 'list',
})
featured_travel_destination_detail = FeaturedTravelDestinationViewSet.as_view({
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
    url(r'^api/reports/$', report_list, name='report-list'),
    url(r'^api/reports/(?P<pk>[0-9]+)/$', report_detail, name='report-detail'),
    url(r'^api/users/$', user_list, name='user-list'),
    url(r'^api/users/(?P<pk>[0-9]+)/$', user_detail, name='user-detail'),
    url(r'^api/reportimages/$', report_image_list, name='report-image-list'),
    url(r'^api/reportimages/(?P<pk>[0-9]+)/$', report_image_detail, name='report-image-detail'),
    url(r'^api/images/$', image_list, name='image-list'),
    url(r'^api/images/(?P<pk>[0-9]+)/$', image_detail, name='image-detail'),
    url(r'^api/articlemainimages/$', article_main_image_list, name='article-main-image-list'),
    url(r'^api/articlemainimages/(?P<pk>[0-9]+)/$', article_main_image_detail, name='article-main-image-detail'),
    url(r'^api/traveldestinationmainimages/$', travel_destination_main_image_list, name='travel-destination-main-image-list'),
    url(r'^api/traveldestinationmainimages/(?P<pk>[0-9]+)/$', travel_destination_main_image_detail, name='travel-destination-main-image-detail'),
    url(r'^api/traveldestinationwhattodoimages/$', travel_destination_what_to_do_image_list, name='travel-destination-what-to-do-image-list'),
    url(r'^api/traveldestinationwhattodoimages/(?P<pk>[0-9]+)/$', travel_destination_what_to_do_image_detail, name='travel-destination-what-to-do-image-detail'),
    url(r'^api/traveldestinationgalleryimages/$', travel_destination_gallery_image_list, name='travel-destination-gallery-image-list'),
    url(r'^api/traveldestinationgalleryimages/(?P<pk>[0-9]+)/$', travel_destination_gallery_image_detail, name='travel-destination-gallery-image-detail'),
    url(r'^api/frontpage/$', front_page_list, name='front-page-list'),
    url(r'^api/frontpage/(?P<pk>[0-9]+)/$', front_page_detail, name='front-page-detail'),
])