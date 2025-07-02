# Issue 02 – Login con Cuenta de Google

## 🧑‍💻 Historia de Usuario

**Como** usuario  
**Quiero** iniciar sesión con mi cuenta de Google  
**Para** evitar recordar otra contraseña

---

## ✅ Criterios de Aceptación

- **Given** que elijo iniciar sesión con Google  
  **When** autorizo el acceso con mi cuenta  
  **Then** accedo directamente al sistema (ya sea por primera vez o como usuario existente)

---

## ⚙️ Criterios Técnicos

- La autenticación se realiza mediante **OAuth 2.0** con los scopes mínimos necesarios (email, perfil)
- Se debe validar si la cuenta de Google ya está asociada a un usuario existente en el sistema. Si no lo está, se creará un perfil nuevo
- Los tokens de acceso deben almacenarse de forma segura en Supabase Auth
- Cualquier fallo de autorización deberá mostrarse como error manejado (por ejemplo: si el usuario cancela el popup)
- El inicio de sesión debe registrarse en los **logs de auditoría** como una acción de tipo `login_google`

---


## 🧪 Pruebas Recomendadas

- Iniciar sesión con una cuenta de Google válida (nueva y existente)
- Cancelar el flujo de autorización desde la ventana emergente
- Revisar almacenamiento de usuario e inicio de sesión en la base de datos
- Intentar iniciar sesión con cuenta de Google no permitida (si se aplica filtrado por dominio, por ejemplo)