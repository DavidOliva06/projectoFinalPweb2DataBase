# vercel_server/index.py

import os
import sys

sys.path.append(os.path.join(os.path.dirname(__file__), ".."))

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "footballUNSA.settings")

from django.core.asgi import get_asgi_application
app = get_asgi_application()
