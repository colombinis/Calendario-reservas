# Issue 03 – Login mediante Link por Email

## 🧑‍💻 Historia de Usuario

**Como** usuario  
**Quiero** acceder al sistema mediante un enlace que se me envía por correo electrónico  
**Para** no tener que recordar ni ingresar mi contraseña

---

## ✅ Criterios de Aceptación

- **Given** que ingreso mi email registrado en la pantalla de inicio de sesión  
  **When** recibo el correo con el link de acceso  
  **Then** al hacer clic accedo automáticamente al sistema sin introducir ninguna clave

---

## ⚙️ Criterios Técnicos

- El link de acceso es **único, autogenerado** y válido por **2 horas**
- Luego de ese plazo, el enlace expira y no permite el acceso
- El envío del correo se realiza a través del servicio de email **Resend**
- La lógica de validación del enlace está implementada con **Supabase Auth**
- El login exitoso a través del link se registra en los **logs de auditoría** como acción `login_link_email`
- Si el usuario hace clic en un enlace vencido o inválido, el sistema mostrará un mensaje de error informativo

---

## 🧪 Pruebas Recomendadas

- Ingresar email válido y recibir el link
- Validar acceso con link dentro del tiempo permitido
- Acceder con link expirado
- Reenviar link luego de vencido
- Verificar que se genera log de auditoría en login exitoso
- Intentar acceso con email inexistente (manejo de error)
