# -*- coding: utf-8 -*-
'''
Production Configurations

- Use djangosecure
- Use Amazon's S3 for storing static files and uploaded media
- Use mailgun to send emails
- Use Redis on Heroku

'''
from __future__ import absolute_import, unicode_literals

from boto.s3.connection import OrdinaryCallingFormat
from django.utils import six


from .common import *  # noqa

# SECRET CONFIGURATION
# ------------------------------------------------------------------------------
# See: https://docs.djangoproject.com/en/dev/ref/settings/#secret-key
# Raises ImproperlyConfigured exception if DJANGO_SECRET_KEY not in os.environ
SECRET_KEY = env("DJANGO_SECRET_KEY")

# SITE CONFIGURATION
# ------------------------------------------------------------------------------
# Hosts/domain names that are valid for this site
# See https://docs.djangoproject.com/en/1.6/ref/settings/#allowed-hosts
ALLOWED_HOSTS = env.list('DJANGO_ALLOWED_HOSTS', default=['pythonified.com'])
# END SITE CONFIGURATION

# EMAIL
# ------------------------------------------------------------------------------
# DEFAULT_FROM_EMAIL = env('DJANGO_DEFAULT_FROM_EMAIL',
#                          default='kompres2015 <noreply@example.com>')
# EMAIL_BACKEND = 'django_mailgun.MailgunBackend'
# MAILGUN_ACCESS_KEY = env('DJANGO_MAILGUN_API_KEY')
# MAILGUN_SERVER_NAME = env('DJANGO_MAILGUN_SERVER_NAME')
# EMAIL_SUBJECT_PREFIX = env("DJANGO_EMAIL_SUBJECT_PREFIX", default='[kompres2015] ')
# SERVER_EMAIL = env('DJANGO_SERVER_EMAIL', default=DEFAULT_FROM_EMAIL)

# TEMPLATE CONFIGURATION
# ------------------------------------------------------------------------------
# See:
# https://docs.djangoproject.com/en/dev/ref/templates/api/#django.template.loaders.cached.Loader
TEMPLATES[0]['OPTIONS']['loaders'] = [
    ('django.template.loaders.cached.Loader', [
        'django.template.loaders.filesystem.Loader', 'django.template.loaders.app_directories.Loader', ]),
]

# DATABASE CONFIGURATION
# ------------------------------------------------------------------------------
# Raises ImproperlyConfigured exception if DATABASE_URL not in os.environ
DATABASES['default'] = env.db("DATABASE_URL")

# CACHING
# ------------------------------------------------------------------------------
# Heroku URL does not pass the DB number, so we parse it in
# CACHES = {
#     "default": {
#         "BACKEND": "django_redis.cache.RedisCache",
#         "LOCATION": "{0}/{1}".format(env.cache_url('REDIS_URL', default="redis://127.0.0.1:6379"), 0),
#         "OPTIONS": {
#             "CLIENT_CLASS": "django_redis.client.DefaultClient",
#             "IGNORE_EXCEPTIONS": True,  # mimics memcache behavior.
#                                         # http://niwinz.github.io/django-redis/latest/#_memcached_exceptions_behavior
#         }
#     }
# }


# Custom Admin URL, use {% url 'admin:index' %}
ADMIN_URL = env('DJANGO_ADMIN_URL')

# Your production stuff: Below this line define 3rd party library settings
