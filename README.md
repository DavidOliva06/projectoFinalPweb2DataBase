# Proyecto Django: Sistema de Inscripcion para Futbol UNSA
## Descripción
Este proyecto consiste en el desarrollo de un sistema de inscripciones para un torneo de futbol utilizando el framework **Django**. El sistema permite la administración y visualización de equipos, jugadores y fixtures.
## Integrantes
- **Oliva Valdivia David Alexander** 
- **Chipana Mamani Andhy Brayan**
- **Subia Huaicane Edson Fabricio**
##  Arquitectura MTV (Model - Template - View)
![Diagrama MTV](prac03/football_Project_UNSA/modelos.png)
##  Tecnologías utilizadas
- Python 3.x
- Django 4.x
- PostgreSQL
- HTML5
(Luego veremos el front-end)
##  Instalación y ejecución
1. Clona el repositorio:
   - git clone (Link del proyecto final)
   - cd football_Project_UNSA/
2. Crea un entorno virtual y actívalo:
   - python -m venv env
   - env\Scripts\activate
3. Instala las dependencias:
   - pip install -r requirements.txt
4. Realiza las migraciones:
   - python manage.py makemigrations
   - python manage.py migrate
5. Ejecuta el servidor:
   - python manage.py runserver
##  Estructura del proyecto
```
football_Project_UNSA/
├── manage.py
├── requirements.txt
├── football_Project_UNSA/   
│   ├── settings.py
│   ├── urls.py
│   └── ...
├── inscription_app/     
│   ├── models.py
│   ├── views.py
│   ├── forms.py
│   ├── templates/
│   └── ...
```
##  Credenciales por defecto
- Usuario administrador: admin
- Contraseña: admin123
##  Funcionalidades principales
- Registro e inicio de sesión de usuarios
- CRUD de equipos, facultades, jugadores y fixture
- Gestión de inscripciones
- Plantillas dinámicas con HTML + Django Templates
##  Estado del proyecto
- **(TRUE)** Configuración inicial del proyecto
- **(TRUE)** Modelado de base de datos
- **(TRUE)** CRUD básico
- **(FALSE)** Formularios, vistas y urls.
- **(FALSE)** Frontend
- **(FALSE)** Despliegue en la nube 
##  Licencia
Este proyecto es únicamente con fines educativos. Uso libre.
