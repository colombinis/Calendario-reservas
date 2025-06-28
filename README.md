# 📅 Calendario de Reservas

Sistema web para la selección de rangos de fechas entre usuarios registrados, con autenticación por usuario y contraseña, cuenta de Google o enlace enviado por correo. Ideal para reservar días disponibles sin superposiciones.

## 🚀 Funcionalidades principales

- Registro e inicio de sesión con distintas opciones
- Selección de fechas en calendario con colores según disponibilidad
- Visualización de reservas existentes
- Anonimato para usuarios no registrados
- Auditoría de acciones
- Filtros y paginación para las reservas

## 🛠️ Tecnologías utilizadas

- **Frontend**: Next.js + TypeScript + TailwindCSS + shadcn/ui
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Emails**: Resend
- **Tests**: Vitest + Testing Library
- **Documentación**: Markdown, almacenada en `/issues` y `/docs`

## 📁 Organización de carpetas
Perfecto, Sebastián. Te dejo a continuación un `README.md` base que explica el propósito del proyecto, sus tecnologías y cómo está organizado, seguido por los comandos para crear los archivos Markdown correspondientes a los issues directamente desde tu entorno local.

---

### ✅ `README.md` (guardar en la raíz del proyecto)

```markdown
# 📅 Calendario de Reservas

Sistema web para la selección de rangos de fechas entre usuarios registrados, con autenticación por usuario y contraseña, cuenta de Google o enlace enviado por correo. Ideal para reservar días disponibles sin superposiciones.

## 🚀 Funcionalidades principales

- Registro e inicio de sesión con distintas opciones
- Selección de fechas en calendario con colores según disponibilidad
- Visualización de reservas existentes
- Anonimato para usuarios no registrados
- Auditoría de acciones
- Filtros y paginación para las reservas

## 🛠️ Tecnologías utilizadas

- **Frontend**: Next.js + TypeScript + TailwindCSS + shadcn/ui
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Emails**: Resend
- **Tests**: Vitest + Testing Library
- **Documentación**: Markdown, almacenada en `/issues` y `/docs`

## 📁 Organización de carpetas

```
/app/               # Rutas del sistema (Next.js App Router)
/components/        # Componentes reutilizables
/lib/               # Lógica de negocio y helpers
/public/            # Imágenes, íconos, estáticos
/styles/            # Configuración de Tailwind
/supabase/          # Esquema, migraciones y funciones de BD
/emails/            # Templates para correo
/issues/            # Historias de usuario e issues técnicos en Markdown
/tests/             # Pruebas unitarias y de integración
/docs/              # Documentación técnica extendida
```

## 📋 Issues y planificación

Todas las historias de usuario, criterios técnicos y tareas están documentadas como archivos `.md` bajo la carpeta `/issues`.

---

## 🔧 Cómo generar los archivos de issues

Podés correr estos comandos en tu terminal desde la raíz del proyecto (requiere `bash`):

```bash
mkdir -p issues

touch issues/01-registro-login-usuario.md
touch issues/02-login-google.md
touch issues/03-login-link-email.md
touch issues/04-seleccion-fechas-calendario.md
touch issues/05-listado-reservas.md
touch issues/06-estructura-carpetas.md
touch issues/07-creacion-tests.md
touch issues/08-documentacion-tecnica.md
```

Una vez creados los archivos, podés copiar el contenido correspondiente que ya generamos en cada uno.

---

## 🤝 Contribuciones

Este repositorio está pensado para crecer en etapas. Si vas a colaborar, revisá los issues de `/issues`, seguí la estructura definida y asegurate de mantener los estándares del sistema.

---
