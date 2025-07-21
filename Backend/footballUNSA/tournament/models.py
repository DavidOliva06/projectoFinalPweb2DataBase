from django.db import models
from django.conf import settings
class Faculty(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Team(models.Model):
    name = models.CharField(max_length=100)
    faculty = models.ForeignKey(Faculty, on_delete=models.CASCADE, related_name='teams')

    def __str__(self):
        return self.name

class Player(models.Model):
    # --- CORRECCIÓN: Hacemos el campo opcional a nivel de base de datos ---
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='player_profile',
        null=True,  
        blank=True  
    )

    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=254, unique=True, null=True, blank=True)
    age = models.PositiveIntegerField()
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='players')
    # auto_now_add=True es mejor para que la fecha se establezca en el momento de la creación.
    registration_date = models.DateField(auto_now_add=True) 

    def __str__(self):
        return f"{self.name} ({self.team.name})"

class Fixture(models.Model):
    team1 = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='home_fixtures')
    team2 = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='away_fixtures')
    date = models.DateTimeField()

    def __str__(self):
        return f"{self.team1.name} vs {self.team2.name} - {self.date.strftime('%Y-%m-%d %H:%M')}"

