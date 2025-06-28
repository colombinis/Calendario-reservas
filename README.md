# 📘 Documentación del Sistema Web – Historias de Usuario, Criterios de Aceptación y Detalles Técnicos

---

## A. Registro e Inicio de Sesión

### Historia A.1 – Registro y Login con Usuario y Contraseña
**Como** nuevo usuario  
**Quiero** registrarme con un nombre de usuario y contraseña  
**Para** poder ingresar al sistema de manera segura

#### Criterios de Aceptación:
- Given que soy un nuevo usuario  
  When completo el formulario de registro  
  Then el sistema crea mi cuenta y muestra un mensaje de éxito  
- Given que tengo una cuenta  
  When ingreso usuario y contraseña correctos  
  Then accedo sin errores  
- Given que ingreso credenciales incorrectas  
  When intento iniciar sesión  
  Then el sistema muestra mensaje de error

#### Criterios Técnicos:
- Contraseñas de mínimo 8 caracteres
- No se aplica hash por ahora
- Hasta 5 intentos fallidos antes de bloquear por 1 hora
- Se permite múltiples sesiones simultáneas

---

### Historia A.2 – Login con Cuenta de Google
**Como** usuario  
**Quiero** iniciar sesión con mi cuenta de Google  
**Para** evitar recordar otra contraseña  

#### Criterios de Aceptación:
- Given que elijo iniciar sesión con Google  
  When autorizo el acceso  
  Then accedo directamente al sistema

#### Criterios Técnicos:
- OAuth 2.0 con scopes mínimos

---

### Historia A.3 – Login por Link Email
**Como** usuario  
**Quiero** acceder con un link enviado a mi email  
**Para** no tener que usar una contraseña

#### Criterios de Aceptación:
- Given que ingreso mi email  
  When recibo el correo y hago clic en el link  
  Then accedo automáticamente

#### Criterios Técnicos:
- El link expira a las 2 horas
- Se usa el servicio Resend para los correos

---

## B. Selección de Fechas mediante Calendario

### Historia B – Selección de Fechas
**Como** usuario autenticado  
**Quiero** elegir un rango de fechas en un calendario  
**Para** reservar días disponibles sin conflictos

#### Criterios de Aceptación:
- Given que accedí al sistema  
  When se carga la pantalla  
  Then veo un calendario para seleccionar fechas  
- Given que hay días ocupados  
  When veo el calendario  
  Then aparecen: días ocupados en rojo, disponibles en verde, selección en amarillo  
- Given que navego el calendario  
  When busco fechas  
  Then puedo elegir desde un mes anterior hasta 24 meses adelante

#### Criterios Técnicos:
- Renderizado del calendario desde el servidor (SSR) usando Next.js + TypeScript + Tailwind + shadcn/ui
- Fechas almacenadas en PostgreSQL vía Supabase
- Validaciones:
  - No se permiten fechas pasadas
  - No se permiten fechas solapadas
  - Solo un usuario puede confirmar un rango de fechas; el sistema bloquea otros intentos en simultáneo
- Control de concurrencia implementado
- Se registran logs de selección

---

## C. Listado de Reservas de Otros Usuarios

### Historia C – Visualizar Reservas
**Como** usuario  
**Quiero** ver un listado de rangos de fecha elegidos por otros  
**Para** planificar mi selección sin superposiciones

#### Criterios de Aceptación:
- Given que estoy autenticado  
  When accedo a la sección de reservas  
  Then veo una tabla con columnas: Fecha desde, Fecha hasta, Nombre usuario, Fecha de selección

#### Criterios Técnicos:
- El listado es visible para todos:
  - Usuarios no registrados verán nombres anonimizados
- El listado está ordenado por “Fecha desde”
- Se implementa paginación y filtros por rango de fechas
- Backend expone endpoints para filtros y paginación

---

## 🛠️ Otros Detalles Técnicos Globales

- Frontend: Next.js + TypeScript + Tailwind + shadcn/ui
- Backend: Supabase + PostgreSQL
- Autenticación: email/password, Google OAuth2, link por email
- Servicio de correos: Resend
- Logs de auditoría registrados en tabla separada:
  - Incluyen login, selección de fechas, etc.
  - Filtros por usuario, tipo de acción y fecha
