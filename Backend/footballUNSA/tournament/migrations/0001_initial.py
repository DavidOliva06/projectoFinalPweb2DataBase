# Generated by Django 5.2.4 on 2025-07-06 18:14

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Faculty',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Team',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('faculty', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='teams', to='tournament.faculty')),
            ],
        ),
        migrations.CreateModel(
            name='Player',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('age', models.PositiveIntegerField()),
                ('registration_date', models.DateField()),
                ('team', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='players', to='tournament.team')),
            ],
        ),
        migrations.CreateModel(
            name='Fixture',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField()),
                ('team1', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='home_fixtures', to='tournament.team')),
                ('team2', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='away_fixtures', to='tournament.team')),
            ],
        ),
    ]
