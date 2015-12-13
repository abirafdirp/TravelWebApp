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
from kompres2015.tourism.views import TravelDestinationContentViewSet
from kompres2015.tourism.views import model_3d_view

from kompres2015.users.views import UserViewSet

from kompres2015.image.views import ReportImageViewSet
from kompres2015.image.views import ImageViewSet
from kompres2015.image.views import TravelDestinationImageViewSet
from kompres2015.image.views import ArticleImageViewSet

from kompres2015.pages.views import PageViewSet
from kompres2015.pages.views import FeaturedTravelDestinationViewSet
from kompres2015.pages.views import HomeLinkViewSet

from kompres2015.transportation.views import TransportationViewSet

from kompres2015.authentication.views import FacebookLogin

from kompres2015.article.views import ArticleViewSet


# cookiecutter default urls
urlpatterns = [
    url(r'^about/$', TemplateView.as_view(template_name='pages/about.html'),
        name="about"),

    # Django Admin, use {% url 'admin:index' %}
    url(settings.ADMIN_URL, include(admin.site.urls)),

    # User management
    # url(r'^users/', include("kompres2015.users.urls", namespace="users")),
    # url(r'^accounts/', include('allauth.urls')),

    # Your stuff: custom urls includes go here
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

# DRF api-auth and DRF swagger (docs)
urlpatterns += [
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api/docs/', include('rest_framework_swagger.urls')),

    # django-rest-auth will call internal django password reset and try to find
    # a url named password_reset_confirm, unlike email verification,
    # it does not do that.
    url(r'^akun/konfirmasi-reset-password/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})$',
        TemplateView.as_view(template_name='base.html'), name='password_reset_confirm'),

    url(r'^ckeditor/', include('ckeditor_uploader.urls')),

    # User management
    url(r'^accounts/', include('allauth.urls')),

    url(r'^jet/', include('jet.urls', 'jet')),  # Django JET URLS
    url(r'^jet/dashboard/', include('jet.dashboard.urls', 'jet-dashboard')),  # Django JET dashboard URLS
]


# Because I use hyperlinkedfields, I can't use default routers anymore. every
# urls must be explicitly defined.
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
    'post': 'create',
})
visit_detail = VisitViewSet.as_view({
    'get': 'retrieve',
})
report_list = ReportViewSet.as_view({
    'get': 'list',
    'post': 'create',
})
report_detail = ReportViewSet.as_view({
    'get': 'retrieve',
})
user_detail = UserViewSet.as_view({
    'get': 'retrieve',
})
report_image_list = ReportImageViewSet.as_view({
    'get': 'list',
    'post': 'create',
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
article_image_list = ArticleImageViewSet.as_view({
    'get': 'list',
})
article_image_detail = ArticleImageViewSet.as_view({
    'get': 'retrieve',
})
travel_destination_image_list = TravelDestinationImageViewSet.as_view({
    'get': 'list',
})
travel_destination_image_detail = TravelDestinationImageViewSet.as_view({
    'get': 'retrieve',
})
page_list = PageViewSet.as_view({
    'get': 'list',
})
page_detail = PageViewSet.as_view({
    'get': 'retrieve',
})
home_link_list = HomeLinkViewSet.as_view({
    'get': 'list',
})
home_link_detail = HomeLinkViewSet.as_view({
    'get': 'retrieve',
})
featured_travel_destination_list = FeaturedTravelDestinationViewSet.as_view({
    'get': 'list',
})
featured_travel_destination_detail = FeaturedTravelDestinationViewSet.as_view({
    'get': 'retrieve',
})
article_list = ArticleViewSet.as_view({
    'get': 'list',
})
article_detail = ArticleViewSet.as_view({
    'get': 'retrieve',
})
transportation_list = TransportationViewSet.as_view({
    'get': 'list',
})
transportation_detail = TransportationViewSet.as_view({
    'get': 'retrieve',
})
travel_destination_content_list = TravelDestinationContentViewSet.as_view({
    'get': 'list',
})
travel_destination_content_detail = TravelDestinationContentViewSet.as_view({
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
    url(r'^api/user/visits/$', visit_list, name='visit-list'),
    url(r'^api/user/visits/(?P<pk>[0-9]+)/$', visit_detail, name='visit-detail'),
    url(r'^api/user/reports/$', report_list, name='report-list'),
    url(r'^api/user/reports/(?P<pk>[0-9]+)/$', report_detail, name='report-detail'),
    url(r'^api/user/reportimages/$', report_image_list, name='report-image-list'),
    url(r'^api/user/reportimages/(?P<pk>[0-9]+)/$', report_image_detail, name='report-image-detail'),
    url(r'^api/images/$', image_list, name='image-list'),
    url(r'^api/images/(?P<pk>[0-9]+)/$', image_detail, name='image-detail'),
    url(r'^api/articleimages/$', article_image_list, name='article-image-list'),
    url(r'^api/articleimages/(?P<pk>[0-9]+)/$', article_image_detail, name='article-image-detail'),
    url(r'^api/traveldestinationimages/$', travel_destination_image_list, name='travel-destination-image-list'),
    url(r'^api/traveldestinationimages/(?P<pk>[0-9]+)/$', travel_destination_image_detail, name='travel-destination-image-detail'),
    url(r'^api/pages/$', page_list, name='page-list'),
    url(r'^api/pages/(?P<pk>[0-9]+)/$', page_detail, name='page-detail'),
    # url(r'^api/featuredtraveldestinations/$', featured_travel_destination_list, name='featured-travel-destination-list'),
    # url(r'^api/featuredtraveldestinations/(?P<pk>[0-9]+)/$', featured_travel_destination_detail, name='featured-travel-destination-detail'),
    url(r'^api/articles/$', article_list, name='article-list'),
    url(r'^api/articles/(?P<pk>[0-9]+)/$', article_detail, name='article-detail'),
    url(r'^api/homelinks/$', home_link_list, name='home-link-list'),
    url(r'^api/homelinks/(?P<pk>[0-9]+)/$', home_link_detail, name='home-link-detail'),
    url(r'^api/traveldestinationcontents/$', travel_destination_content_list, name='travel-destination-content-list'),
    url(r'^api/traveldestinationcontents/(?P<pk>[0-9]+)/$', travel_destination_content_detail, name='travel-destination-content-detail'),
    url(r'^api/transportations/$', transportation_list, name='transportation-list'),
    url(r'^api/transportation/(?P<pk>[0-9]+)/$', transportation_detail, name='transportation-detail'),

    url(r'^api/', include('rest_auth.urls')),
    url(r'^api/login/facebook/$', FacebookLogin.as_view(), name='fb_login'),
    url(r'^api/registration/', include('rest_auth.registration.urls')),
])


# partial views
urlpatterns += [
    url(r'^partials/home/$', TemplateView.as_view(template_name='partials/pages/home.html'),
        name="home-partial"),
    url(r'^partials/report/$', TemplateView.as_view(template_name='partials/tourism/report.html'),
        name="report-partial"),
    url(r'^partials/article-list/$', TemplateView.as_view(template_name='partials/article/article_list.html'),
        name="article-list-partial"),
    url(r'^partials/article-detail/$', TemplateView.as_view(template_name='partials/article/article_detail.html'),
        name="article-detail-partial"),
    url(r'^partials/travel-destination-list/$', TemplateView.as_view(template_name='partials/tourism/travel_destination_list.html'),
        name="travel-destination-list-partial"),
    url(r'^partials/travel-destination-detail/$', TemplateView.as_view(template_name='partials/tourism/travel_destination_detail.html'),
        name="travel-destination-detail-partial"),
    url(r'^partials/map/$', TemplateView.as_view(template_name='partials/map/map.html'),
        name="map"),
    url(r'^partials/modelviewer/$', TemplateView.as_view(template_name='partials/tourism/3d_viewer.html'),
        name="model-viewer-partial"),
    url(r'^partials/models/(?P<travel_destination_name>.*)/$', model_3d_view,
        name="models-partial"),
    url(r'^partials/transportation-list/$', TemplateView.as_view(template_name='partials/transportation/transportation_list.html'),
        name="transportation-list-partial"),
    url(r'^partials/visit/$', TemplateView.as_view(template_name='partials/tourism/visit.html'),
        name="visit-partial"),
    url(r'^partials/contact-info/$', TemplateView.as_view(template_name='partials/pages/contact_info.html'),
        name="contact-info-partial"),
]

# angular-django-registration-auth partial views
urlpatterns += [
     url(r'^partials/account/$', TemplateView.as_view(template_name='partials/auth/main.html'),
        name="account-partial"),
    url(r'^partials/register/$', TemplateView.as_view(template_name='partials/auth/register.html'),
        name="register-partial"),
    url(r'^partials/register/$', TemplateView.as_view(template_name='partials/auth/register.html'),
        name="register-partial"),
    url(r'^partials/passwordreset/$', TemplateView.as_view(template_name='partials/auth/passwordreset.html'),
        name="passwordreset-partial"),
    url(r'^partials/passwordresetconfirm/$', TemplateView.as_view(template_name='partials/auth/passwordresetconfirm.html'),
        name="passwordresetconfirm-partial"),
    url(r'^partials/login/$', TemplateView.as_view(template_name='partials/auth/login.html'),
        name="login-partial"),
    url(r'^partials/verifyemail/$', TemplateView.as_view(template_name='partials/auth/verifyemail.html'),
        name="verifyemail-partial"),
    url(r'^partials/logout/$', TemplateView.as_view(template_name='partials/auth/logout.html'),
        name="logout-partial"),
    url(r'^partials/userprofile/$', TemplateView.as_view(template_name='partials/auth/userprofile.html'),
        name="userprofile-partial"),
    url(r'^partials/passwordchange/$', TemplateView.as_view(template_name='partials/auth/passwordchange.html'),
        name="passwordchange-partial"),
    url(r'^partials/passwordchange/$', TemplateView.as_view(template_name='partials/auth/passwordchange.html'),
        name="passwordchange-partial"),
    url(r'^partials/restricted/$', TemplateView.as_view(template_name='partials/auth/restricted.html'),
        name="restricted-partial"),
    url(r'^partials/authrequired/$', TemplateView.as_view(template_name='partials/auth/authrequired.html'),
        name="authrequired-partial"),
]

# any urls other than listed above will be redirected to angular base
if settings.HTTPS:
    urlpatterns += [
        url(r'', TemplateView.as_view(template_name='base.html'),
            name="base"),
    ]
else:
    urlpatterns += [
        url(r'', TemplateView.as_view(template_name='base_http.html'),
            name="base"),
    ]