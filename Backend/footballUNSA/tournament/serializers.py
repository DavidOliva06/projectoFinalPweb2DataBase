# Archivo: tournament/serializers.py

from rest_framework import serializers
from .models import Faculty, Team, Player, Fixture
from django.contrib.auth.models import User

# --- ORDEN DE DEFINICIÓN CORRECTO Y LIMPIO ---

# 1. FacultySerializer: No depende de nadie.
class FacultySerializer(serializers.ModelSerializer):
    class Meta:
        model = Faculty
        fields = ['id', 'name']

# 2. PlayerSerializer Básico (para anidar en Team):
#    Este serializer solo se usará para mostrar los jugadores DENTRO de un equipo.
#    No necesita la lógica de escritura (team_id).
class NestedPlayerSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    class Meta:
        model = Player
        fields = ['id', 'name', 'age', 'email', 'registration_date', 'user']

# 3. TeamSerializer: Ahora puede usar el NestedPlayerSerializer sin problemas.
class TeamSerializer(serializers.ModelSerializer):
    faculty = FacultySerializer(read_only=True)
    players = NestedPlayerSerializer(many=True, read_only=True)

    class Meta:
        model = Team
        fields = ['id', 'name', 'faculty', 'players']

# 4. PlayerSerializer Principal (para el endpoint /api/players/):
#    Este es el serializer completo que se usa para crear y ver jugadores individuales.
class PlayerSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    team = TeamSerializer(read_only=True)
    team_id = serializers.PrimaryKeyRelatedField(
        queryset=Team.objects.all(), 
        source='team',
        write_only=True
    )

    class Meta:
        model = Player
        fields = ['id', 'user', 'name', 'age', 'email', 'team', 'team_id', 'registration_date']
        read_only_fields = ['user', 'registration_date']

# 5. FixtureSerializer
class FixtureSerializer(serializers.ModelSerializer):
    team1 = TeamSerializer(read_only=True)
    team2 = TeamSerializer(read_only=True)
    class Meta:
        model = Fixture
        fields = ['id', 'team1', 'team2', 'date']

# 6. UserRegisterSerializer
class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    class Meta:
        model = User
        fields = ('password', 'email', 'first_name')
        read_only_fields = ('username',)

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['email'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            is_active=False
        )
        return user