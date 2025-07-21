# Archivo: tournament/backends.py

from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model
from django.db.models import Q

UserModel = get_user_model()

class EmailBackend(ModelBackend):
    """
    Este es un backend de autenticación personalizado.
    Permite a los usuarios iniciar sesión usando su dirección de correo electrónico.
    """
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            # Busca un usuario cuyo username O email coincida con el valor de 'username' recibido.
            # Esto hace que sea flexible: funciona si se envía 'username' o 'email'.
            user = UserModel.objects.get(Q(username__iexact=username) | Q(email__iexact=username))
        except UserModel.DoesNotExist:
            # Si no encuentra ningún usuario, retorna None, la autenticación falla.
            UserModel().set_password(password)
            return
        except UserModel.MultipleObjectsReturned:
            # Si encuentra múltiples usuarios (raro, pero posible si hay datos corruptos),
            # intenta encontrar uno que coincida con el username exacto.
            user = UserModel.objects.filter(Q(username__iexact=username) | Q(email__iexact=username)).order_by('id').first()

        # Una vez que tenemos un usuario, comprobamos su contraseña.
        if user.check_password(password) and self.user_can_authenticate(user):
            return user