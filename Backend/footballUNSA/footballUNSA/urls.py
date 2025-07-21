from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from tournament.views import LoginView
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('tournament.urls')),
    path('api/auth/token/', LoginView.as_view(), name='token_obtain_pair'),
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

