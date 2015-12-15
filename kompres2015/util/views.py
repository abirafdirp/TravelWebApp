from rest_framework import viewsets
from rest_framework import mixins

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse


class CreateListRetrieveViewSet(mixins.CreateModelMixin,
                        mixins.ListModelMixin,
                        viewsets.GenericViewSet,
                        mixins.RetrieveModelMixin):
    pass


@api_view(('GET',))
def api_root(request, format=None):
    return Response({
        'regions': reverse('region-list', request=request, format=format),
        'provinces': reverse('province-list', request=request, format=format),
        'districts': reverse('district-list', request=request, format=format),
        'travel destinations': reverse('travel-destination-list', request=request, format=format),
        'visits': reverse('visit-list', request=request, format=format),
        'reports': reverse('report-list', request=request, format=format),
        'images': reverse('image-list', request=request, format=format),
        'report images': reverse('report-image-list', request=request, format=format),
        'articles images': reverse('article-image-list', request=request, format=format),
        'travel destination images': reverse('travel-destination-image-list', request=request, format=format),
        'page': reverse('page-list', request=request, format=format),
        'articles': reverse('article-list', request=request, format=None),
        'travel destination contents': reverse('travel-destination-content-list', request=request, format=None),
        'home links': reverse('home-link-list', request=request, format=None),
        'transportations': reverse('transportation-list', request=request, format=None),
        'registration': reverse('rest_register', request=request, format=None),
        'verify email': reverse('rest_verify_email', request=request, format=None),
        'password reset': reverse('rest_password_reset', request=request, format=None),
        'password reset confirm': reverse('rest_password_reset_confirm', request=request, format=None),
        'login': reverse('rest_login', request=request, format=None),
        'logout': reverse('rest_logout', request=request, format=None),
        'user': reverse('rest_user_details', request=request, format=None),
        'password change': reverse('rest_password_change', request=request, format=None),
    })