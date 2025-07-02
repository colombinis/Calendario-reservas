# Issue 01 – Registro y Login con Usuario y Contraseña

## 🧑‍💻 Historia de Usuario

**Como** nuevo usuario  
**Quiero** registrarme con un nombre de usuario y contraseña  
**Para** poder ingresar al sistema de manera segura

---

## ✅ Criterios de Aceptación

- **Given** que soy un nuevo usuario  
  **When** completo el formulario de registro  
  **Then** el sistema crea mi cuenta y muestra un mensaje de éxito

- **Given** que tengo una cuenta  
  **When** ingreso usuario y contraseña correctos  
  **Then** accedo sin errores

- **Given** que ingreso credenciales incorrectas  
  **When** intento iniciar sesión  
  **Then** el sistema muestra mensaje de error

---

## ⚙️ Criterios Técnicos

- Las contraseñas deben tener al menos **8 caracteres**
- No se aplicará hash por el momento (revisar esto a futuro por seguridad)
- Después de **5 intentos fallidos**, la cuenta se bloquea por **1 hora**
- Se permiten múltiples sesiones activas simultáneamente por usuario
- Autenticación y almacenamiento gestionados mediante **Supabase**
- Los eventos de login exitoso/fallido y bloqueo deben **registrarse en los logs de auditoría**

---

## 🧪 Pruebas Recomendadas
- Registro con datos válidos
- Registro con datos inválidos (passwords muy cortas)
- Login exitoso
- Login con credenciales incorrectas
- Verificación de bloqueo después de 5 intentos fallidos
- Reintento de login después del tiempo de bloqueo

---

> Etiquetas sugeridas: `historia de usuario`, `login`, `prioridad-alta`, `autenticación`
