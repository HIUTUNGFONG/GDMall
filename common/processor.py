from __future__ import unicode_literals

from django.conf import settings

def ali_media(request):
    """
    Adds media-related context variables to the context.
    """
    return {'ALI_MEDIA_URL': settings.ALI_MEDIA_URL}
