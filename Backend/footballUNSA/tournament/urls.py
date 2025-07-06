from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import FacultyViewSet, TeamViewSet, PlayerViewSet, FixtureViewSet

router = DefaultRouter()
router.register(r'faculties', FacultyViewSet)
router.register(r'teams', TeamViewSet)
router.register(r'players', PlayerViewSet)
router.register(r'fixtures', FixtureViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
