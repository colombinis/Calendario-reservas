# 📅 Calendario de Reservas

Sistema web para la reserva de un casa para vacaciones. Permitiendo la selección de rangos de tiempos. Solo pueden reservar usuarios registrados, con autenticación por usuario y contraseña, cuenta de Google o enlace enviado por correo. Ideal para reservar horarios o días disponibles sin superposiciones.

## 🚀 Funcionalidades principales

- Registro e inicio de sesión con distintas opciones
- Selección de fechas y horas en calendario con colores según disponibilidad
- Visualización de reservas existentes
- Anonimato para usuarios no registrados
- Auditoría de acciones
- Filtros y paginación para las reservas existentes

## 🛠️ Setup & Development

### Backend
The backend is a Node.js Express application located in `src/backend`.

1.  **Dependencies:** Navigate to `src/backend` and run `npm install`.
2.  **Environment Variables:** The backend requires Supabase credentials to function correctly for user authentication and data storage. Create a `.env` file in the `src/backend` directory or set the following environment variables:
    *   `SUPABASE_URL`: Your Supabase project URL.
    *   `SUPABASE_ANON_KEY`: Your Supabase project anon key.
    *   `PORT`: (Optional) The port for the backend server (defaults to 3001).
    *   *Note: The Supabase client (`supabaseClient.js`) will warn if these are not set or are using placeholder values.*
3.  **Database Schema:** Ensure the necessary tables for authentication (e.g., `user_login_attempts`, `audit_logs`) are created in your Supabase instance as per the project's requirements.
4.  **Running:** (Add command to run backend, e.g., `npm start` if defined in `package.json`)

### Frontend
The frontend is a Next.js application located in `src/frontend/my-front`.

1.  **Dependencies:** Navigate to `src/frontend/my-front` and run `npm install`.
2.  **Running:** Navigate to `src/frontend/my-front` and run `npm run dev`. This usually starts the development server on `http://localhost:3000`.

*(Further details on running both frontend and backend concurrently, and proxying API requests if necessary, should be added here as the project evolves.)*