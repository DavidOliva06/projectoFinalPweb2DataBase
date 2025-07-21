from rest_framework import serializers
from .models import Faculty, Team, Player, Fixture
from django.contrib.auth.models import User


class FacultySerializer(serializers.ModelSerializer):
    class Meta:
        model = Faculty
        fields = '__all__'
class PlayerSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    team_info = serializers.ReadOnlyField(source='team.name') # Opcional: solo para mostrar
    
    class Meta:
        model = Player
        fields = ['id', 'name', 'age', 'email', 'registration_date', 'user', 'team_info']

class TeamSerializer(serializers.ModelSerializer):
    # Le decimos que el campo 'faculty' debe ser renderizado usando el FacultySerializer.
    # 'read_only=True' significa que no se usará para escribir datos, solo para mostrarlos.
    faculty = FacultySerializer(read_only=True)
    players = PlayerSerializer(many=True, read_only=True)

    class Meta:
        model = Team
        # --- ¡AÑADE 'players' A LA LISTA DE CAMPOS! ---
        fields = ['id', 'name', 'faculty', 'players']

class FixtureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fixture
        fields = '__all__'
class UserRegisterSerializer(serializers.ModelSerializer):
    # El password se define como de solo escritura, lo cual es correcto.
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = User
        # <-- CORRECCIÓN: Quitamos 'username' de la lista principal de campos editables.
        fields = ('password', 'email', 'first_name')
        
        # Le decimos al serializer que 'username' es un campo que solo se leerá,
        # no se esperará como entrada.
        read_only_fields = ('username',)

    def create(self, validated_data):
        # Ahora el método 'create' funciona como se esperaba.
        # 'validated_data' ya no contiene 'username', así que no hay conflicto.
        user = User.objects.create_user(
            # Asignamos el email al username, que es un requisito de Django.
            username=validated_data['email'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            is_active=False # El usuario se crea inactivo, lo cual es correcto.
        )
        return user