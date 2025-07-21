# Archivo: tournament/tokens.py
# ESTADO: VERSIÓN FINAL Y ROBUSTA

from django.contrib.auth import authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Serializer de login definitivo.
    1. Acepta 'email' y 'password' como entrada.
    2. Usa nuestro EmailBackend personalizado para autenticar.
    3. Devuelve los tokens si la autenticación es exitosa.
    """
    
    # Paso 1: Definimos explícitamente los campos que esperamos del frontend.
    # Esto anula los campos por defecto del serializer padre.
    email = serializers.EmailField(write_only=True)
    password = serializers.CharField(style={'input_type': 'password'}, write_only=True, trim_whitespace=False)

    # El método get_token se hereda y se usa para generar los tokens. No necesitamos cambiarlo.
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Puedes añadir datos personalizados al token aquí si quieres
        # token['name'] = user.first_name
        return token

    def validate(self, attrs):
        """
        Este método se ejecuta para validar las credenciales.
        """
        # 'attrs' es un diccionario que contiene el email y la contraseña del frontend.
        email = attrs.get('email')
        password = attrs.get('password')

        # Paso 2: Usamos el sistema de autenticación de Django.
        # Nuestro EmailBackend se encargará de esta llamada.
        # Le pasamos el 'email' al parámetro 'username', nuestro backend sabe qué hacer.
        user = authenticate(request=self.context.get('request'), username=email, password=password)

        # Paso 3: Verificamos el resultado.
        if not user or not user.is_active:
            # Si el usuario no existe, la contraseña es incorrecta o no está activo,
            # lanzamos el error estándar.
            raise serializers.ValidationError('No active account found with the given credentials.')

        # Si la autenticación es exitosa, generamos los tokens.
        refresh = self.get_token(user)

        # Preparamos la respuesta que se enviará al frontend.
        data = {}
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        
        # Este es un paso importante para que la vista funcione correctamente.
        self.user = user

        return data