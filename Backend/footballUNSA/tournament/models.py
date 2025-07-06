from django.db import models
from django.db import models

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
    name = models.CharField(max_length=100)
    age = models.PositiveIntegerField()
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='players')
    registration_date = models.DateField()

    def __str__(self):
        return f"{self.name} ({self.team.name})"

class Fixture(models.Model):
    team1 = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='home_fixtures')
    team2 = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='away_fixtures')
    date = models.DateTimeField()

    def __str__(self):
        return f"{self.team1.name} vs {self.team2.name} - {self.date.strftime('%Y-%m-%d %H:%M')}"

