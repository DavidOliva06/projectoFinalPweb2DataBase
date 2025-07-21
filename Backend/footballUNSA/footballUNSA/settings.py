# footballUNSA/settings.py

import os
from pathlib import Path
from decouple import config  # Usaremos decouple para una gestión más limpia de las variables.
from datetime import timedelta

# ==============================================================================
# CONFIGURACIÓN BÁSICA DEL PROYECTO
# ==============================================================================

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Carga las variables de entorno desde el archivo .env (solo para desarrollo local)
# En producción (Vercel), estas variables se configuran en el dashboard.
config.search_path = BASE_DIR

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = config('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
# config('DEBUG', default=False, cast=bool) lee la variable y la convierte a booleano.
DEBUG = config('DEBUG', default=False, cast=bool)


# ==============================================================================
# CONFIGURACIÓN DE RED Y SEGURIDAD
# ==============================================================================

ALLOWED_HOSTS = ['127.0.0.1', 'localhost']

# Vercel provee la URL de despliegue en la variable 'VERCEL_URL'.
# La añadimos a ALLOWED_HOSTS automáticamente si estamos en Vercel.
VERCEL_URL = config('VERCEL_URL', default=None)
if VERCEL_URL:
    ALLOWED_HOSTS.append(VERCEL_URL)

# La URL de tu frontend desplegado (ej: en Netlify)
FRONTEND_URL = config('FRONTEND_URL', default='http://localhost:4200')

CORS_ALLOWED_ORIGINS = [
    'http://localhost:4200',  # Para desarrollo local de Angular
    FRONTEND_URL,             # La URL de producción leída desde las variables de entorno
]

# (Opcional) Si tu frontend en Netlify tiene "deploy previews", puedes permitir todos los subdominios.
# CORS_ALLOWED_ORIGIN_REGEXES = [
#     r"^https://\w+\.netlify\.app$",
# ]


# ==============================================================================
# APLICACIONES Y MIDDLEWARE
# ==============================================================================

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # Aplicaciones de terceros
    'corsheaders',
    'rest_framework',
    'rest_framework_simplejwt',
    # Mis aplicaciones
    'tournament',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware', # WhiteNoise debe estar alto
    'corsheaders.middleware.CorsMiddleware',      # CORS Middleware también
    'django.middleware.common.CommonMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'footballUNSA.urls'


# ==============================================================================
# CONFIGURACIÓN DE DJANGO REST FRAMEWORK Y JWT
# ==============================================================================

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'rest_framework.authentication.SessionAuthentication', # Útil para la API Navegable
    )
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(hours=8),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
}

# Usamos nuestro backend personalizado para permitir login con email.
AUTHENTICATION_BACKENDS = [
    'tournament.backends.EmailBackend',
    'django.contrib.auth.backends.ModelBackend',
]


# ==============================================================================
# PLANTILLAS Y WSGI
# ==============================================================================

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'footballUNSA.wsgi.application'


# ==============================================================================
# BASE DE DATOS
# ==============================================================================

# `dj-database-url` ya no es necesario, `decouple` puede parsear la URL directamente.
DATABASES = {
    'default': config('DATABASE_URL', cast=db_url) # Suponiendo que has importado db_url de decouple.db_url
}
# Si prefieres seguir con dj_database_url:
# DATABASES = {
#     'default': dj_database_url.parse(config('DATABASE_URL'), conn_max_age=600, ssl_require=True)
# }


# ==============================================================================
# CONFIGURACIÓN DE CORREO ELECTRÓNICO
# ==============================================================================

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = config('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD')


# ==============================================================================
# ARCHIVOS ESTÁTICOS Y OTROS
# ==============================================================================

STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True