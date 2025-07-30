# ==============================================================================
# IMPORTS
# ==============================================================================

# --- Python Standard Library ---
from io import BytesIO
from datetime import timedelta

# --- Django Imports ---
from django.utils import timezone
from django.http import HttpResponse
from django.shortcuts import redirect
from django.conf import settings
from django.core.mail import send_mail
from django.contrib.auth.models import User
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_bytes
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode

# --- Django REST Framework Imports ---
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import ValidationError

# --- Third-Party Library Imports (ReportLab) ---
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet

# --- Local Application Imports ---
from .models import Faculty, Team, Player, Fixture
from .serializers import (
    FacultySerializer, TeamSerializer, PlayerSerializer, 
    FixtureSerializer, UserRegisterSerializer
)
from .utils import generate_round_robin_fixtures
from .tokens import MyTokenObtainPairSerializer

# ==============================================================================
# VISTAS DE AUTENTICACIÓN
# ==============================================================================

class RegisterView(APIView):
    """
    Endpoint para el registro de nuevos usuarios.
    Crea un usuario inactivo y le envía un correo de verificación.
    """
    permission_classes = [] 
    authentication_classes = []

    def post(self, request, *args, **kwargs):
        # Mapeamos 'name' del frontend a 'first_name' que espera nuestro serializer
        request.data['first_name'] = request.data.get('name', '')
        serializer = UserRegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # Generar token y UID para el enlace de verificación
        token_generator = PasswordResetTokenGenerator()
        token = token_generator.make_token(user)
        uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
        
        # Construir la URL de verificación que apunta a este backend
        verification_url = f"{request.scheme}://{request.get_host()}/api/auth/verify/{uidb64}/{token}/"

        # Enviar el correo electrónico
        subject = 'Activa tu cuenta en Torneos UNSA'
        message = f'Hola {user.first_name},\n\nPor favor, haz clic en el siguiente enlace para activar tu cuenta:\n{verification_url}'
        send_mail(subject, message, 'no-reply@unsa.com', [user.email])

        return Response(
            {"message": "Cuenta creada exitosamente. Por favor, revisa tu correo para activar tu cuenta."},
            status=status.HTTP_201_CREATED
        )


class VerifyEmailView(APIView):
    """
    Endpoint que se activa al hacer clic en el enlace de verificación.
    Activa el usuario y lo redirige a la página de login del frontend.
    """
    permission_classes = []
    authentication_classes = []

    def get(self, request, uidb64, token, *args, **kwargs):
        try:
            user_id = smart_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=user_id)
            token_generator = PasswordResetTokenGenerator()

            if not token_generator.check_token(user, token):
                return redirect(f'{settings.FRONTEND_URL}/verification-failed')

            if not user.is_active:
                user.is_active = True
                user.save()
            
            return redirect(f'{settings.FRONTEND_URL}/login?verified=true')

        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return redirect(f'{settings.FRONTEND_URL}/verification-failed')


# ==============================================================================
# VIEWSETS DEL API DEL TORNEO (CRUD)
# ==============================================================================

class FacultyViewSet(viewsets.ModelViewSet):
    queryset = Faculty.objects.all()
    serializer_class = FacultySerializer
    permission_classes = [IsAdminUser]

class TeamViewSet(viewsets.ModelViewSet):
    """
    API endpoint que permite ver o editar equipos.
    La lista de equipos (GET) es visible para cualquier usuario autenticado.
    La creación/modificación/eliminación sigue siendo solo para administradores.
    Contiene la acción 'generate_fixture' que también es solo para administradores.
    """
    queryset = Team.objects.select_related('faculty').all() # Optimización de consulta
    serializer_class = TeamSerializer
    
    def get_permissions(self):
        """
        Sobrescribe los permisos basados en la acción.
        - 'list' y 'retrieve' (ver lista y detalle) -> para cualquier usuario logueado.
        - Otras acciones (create, update, destroy, generate_fixture) -> solo para admins.
        """
        if self.action in ['list', 'retrieve']:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]


    @action(detail=False, methods=['post', 'get'], permission_classes=[IsAdminUser])
    def generate_fixture(self, request):
        """
        Acción para generar y guardar el fixture completo del torneo.
        Borra el fixture anterior antes de crear el nuevo.
        """
        Fixture.objects.all().delete()
        teams = list(Team.objects.all())
        if len(teams) < 2:
            return Response({"error": "Se necesitan al menos 2 equipos."}, status=status.HTTP_400_BAD_REQUEST)
        
        generated_rounds = generate_round_robin_fixtures()

        start_date = timezone.now().replace(hour=15, minute=0, second=0, microsecond=0)
        while start_date.weekday() != 1: # 1 = Lunes
            start_date += timedelta(days=1)

        fixtures_to_create = []
        for round_num, round_fixtures in enumerate(generated_rounds):
            round_date = start_date + timedelta(weeks=round_num)
            for i, (team1, team2) in enumerate(round_fixtures):
                match_time = round_date + timedelta(hours=i * 2)
                fixtures_to_create.append(Fixture(team1=team1, team2=team2, date=match_time))

        Fixture.objects.bulk_create(fixtures_to_create)
        
        return Response(
            {"message": f"Fixture generado. Se crearon {len(fixtures_to_create)} partidos."},
            status=status.HTTP_201_CREATED
        )

class PlayerViewSet(viewsets.ModelViewSet):
    """
    API endpoint para jugadores.
    - CUALQUIER usuario autenticado puede CREAR un jugador.
    - SOLO los administradores pueden ver la lista, actualizar o borrar.
    """
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer

    def get_permissions(self):
        # --- CORRECCIÓN ---
        # Permitimos 'list' para cualquier usuario autenticado,
        # para que el HomeComponent pueda cargar los últimos registros.
        if self.action in ['create', 'list']:
            permission_classes = [IsAuthenticated]
        else:
            # retrieve, update, destroy siguen siendo solo para admins.
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        """
        Se ejecuta antes de guardar un nuevo jugador.
        Aquí aplicamos nuestra regla de negocio.
        """
        # Comprueba si el usuario que hace la petición ya tiene un jugador.
        if Player.objects.filter(user=self.request.user).exists():
            # Si ya existe, lanza un error de validación claro.
            raise ValidationError('Ya tienes un jugador registrado. No puedes registrar otro.')
        
        # Si no existe, guarda el nuevo jugador, asociándolo con el usuario actual.
        serializer.save(user=self.request.user)

# --------------------------------------------------------------------------
# VISTA DEL LISTADO DE FIXTURES (JSON)
# --------------------------------------------------------------------------
class FixtureViewSet(viewsets.ModelViewSet):
    """
    API endpoint para los partidos.
    Soporta filtrado por ronda.
    Ahora permite el acceso a CUALQUIER USUARIO AUTENTICADO.
    """
    serializer_class = FixtureSerializer
    # --- CAMBIO CLAVE: De IsAdminUser a IsAuthenticated ---
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # ... (la lógica de get_queryset se queda exactamente igual) ...
        queryset = Fixture.objects.all().order_by('date')
        round_number_str = self.request.query_params.get('round')
        # ... etc ...
        return queryset


# ==============================================================================
# VISTAS DE REPORTES
# ==============================================================================

class FixturePDFView(APIView):
    """
    Genera un PDF del fixture por rondas para evitar sobrecargas.
    Acepta un parámetro obligatorio en la URL: ?round=X
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        round_number_str = request.GET.get('round')
        if not round_number_str:
            return Response({"error": "Debe especificar una ronda (ej: /api/fixture/pdf/?round=1)."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            round_number = int(round_number_str)
            first_fixture = Fixture.objects.order_by('date').first()
            if not first_fixture:
                 return Response({"error": "No hay fixtures guardados."}, status=status.HTTP_404_NOT_FOUND)

            start_of_round = first_fixture.date + timedelta(weeks=round_number - 1)
            end_of_round = start_of_round + timedelta(weeks=1)
            fixtures = Fixture.objects.filter(date__gte=start_of_round, date__lt=end_of_round).order_by('date')
            
            if not fixtures.exists():
                return Response({"error": f"No se encontraron partidos para la ronda {round_number}."}, status=status.HTTP_404_NOT_FOUND)
            
            title = f"Fixture Oficial - Ronda {round_number}"

        except (ValueError, TypeError):
            return Response({"error": "El parámetro 'round' debe ser un número entero."}, status=status.HTTP_400_BAD_REQUEST)

        buffer = BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=letter, rightMargin=72, leftMargin=72, topMargin=72, bottomMargin=18)
        styles = getSampleStyleSheet()
        elements = []

        elements.append(Paragraph(title, styles['h1']))
        elements.append(Spacer(1, 24))

        data = [["Fecha y Hora", "Equipo Local", "", "Equipo Visitante"]]
        for fixture in fixtures:
            data.append([
                Paragraph(fixture.date.strftime('%d/%m/%Y %H:%M'), styles['Normal']),
                Paragraph(fixture.team1.name, styles['Normal']), "vs",
                Paragraph(fixture.team2.name, styles['Normal'])
            ])

        table = Table(data, colWidths=[140, 160, 25, 160])
        table.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,0), colors.darkblue),
            ('TEXTCOLOR', (0,0), (-1,0), colors.whitesmoke),
            ('ALIGN', (0,0), (-1,-1), 'CENTER'), ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
            ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
            ('BOTTOMPADDING', (0,0), (-1,0), 12),
            ('BACKGROUND', (0,1), (-1,-1), colors.aliceblue),
            ('GRID', (0,0), (-1,-1), 1, colors.black)
        ]))
        elements.append(table)
        
        doc.build(elements)
        buffer.seek(0)
        return HttpResponse(
            buffer,
            content_type='application/pdf',
            headers={'Content-Disposition': f'inline; filename="fixture_ronda_{round_number}.pdf"'},
        )
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

    # --- AÑADE ESTE MÉTODO PARA DEPURAR ---
    def post(self, request, *args, **kwargs):
        print("----------- INICIO DEPURACIÓN LOGIN -----------")
        print("DATOS RECIBIDOS EN EL BACKEND:", request.data)
        print("-------------------------------------------")
        return super().post(request, *args, **kwargs)
    
class LoginView(APIView):
    """
    Vista de login completamente personalizada.
    Acepta 'email' y 'password' y devuelve tokens JWT.
    """
    # No necesitamos especificar un serializer_class aquí.
    
    def post(self, request, *args, **kwargs):
        # 1. Obtenemos los datos directamente de la petición.
        email = request.data.get('email')
        password = request.data.get('password')

        # 2. Validamos que los datos necesarios fueron enviados.
        if not email or not password:
            return Response(
                {'error': 'Se requiere tanto el email como la contraseña.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # 3. Autenticamos al usuario usando nuestro EmailBackend personalizado.
        #    Le pasamos el 'email' al parámetro 'username'.
        user = authenticate(username=email, password=password)

        # 4. Si la autenticación falla, devolvemos un error claro.
        if user is None:
            return Response(
                {'error': 'Credenciales inválidas o la cuenta no está activa.'},
                status=status.HTTP_401_UNAUTHORIZED # 401 es más correcto para un login fallido.
            )
        
        # 5. Si la autenticación es exitosa, generamos los tokens manualmente.
        refresh = RefreshToken.for_user(user)
        
        # 6. Preparamos y enviamos la respuesta exitosa.
        data = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }
        return Response(data, status=status.HTTP_200_OK)
