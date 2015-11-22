from rest_framework import viewsets
from rest_framework import mixins

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse


class CreateListViewSet(mixins.CreateModelMixin,
                                mixins.ListModelMixin,
                                viewsets.GenericViewSet):
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
        'users': reverse('user-list', request=request, format=format),
        'images': reverse('user-list', request=request, format=format),
        'report images': reverse('report-image-list', request=request, format=format),
        'articles images': reverse('article-image-list', request=request, format=format),
        'travel destination images': reverse('travel-destination-image-list', request=request, format=format),
        'page': reverse('page-list', request=request, format=format),
        'articles': reverse('article-list', request=request, format=None),
        'travel destination contents': reverse('travel-destination-content-list', request=request, format=None),
    })