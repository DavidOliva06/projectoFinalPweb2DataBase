from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import FacultyViewSet, TeamViewSet, PlayerViewSet, FixtureViewSet, FixturePDFView, RegisterView, VerifyEmailView 

router = DefaultRouter()
router.register(r'faculties', FacultyViewSet)
router.register(r'teams', TeamViewSet)
router.register(r'players', PlayerViewSet)
router.register(r'fixtures', FixtureViewSet, basename='fixture')

urlpatterns = [
    path('', include(router.urls)),
    path('fixture/pdf/', FixturePDFView.as_view(), name='fixture-pdf'),
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/verify/<uidb64>/<token>/', VerifyEmailView.as_view(), name='verify-email')
]
