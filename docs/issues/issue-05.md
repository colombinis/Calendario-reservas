# Issue 05 – Listado de Reservas de Otros Usuarios

## 🧑‍💻 Historia de Usuario

**Como** usuario  
**Quiero** ver un listado de los rangos de fechas reservados por otros  
**Para** poder planificar mi propia selección sin superposiciones

---

## ✅ Criterios de Aceptación

- **Given** que estoy autenticado y accedo a la sección de reservas  
  **When** se carga el listado  
  **Then** veo una tabla con las columnas:  
  - Fecha desde  
  - Fecha hasta  
  - Nombre del usuario  
  - Fecha en que se hizo la selección

---

## ⚙️ Criterios Técnicos

- El listado es visible para **todos los usuarios**:
  - Si el usuario **no está autenticado**, los nombres se muestran **anonimizados**
- La tabla está **ordenada por Fecha desde**
- Se implementa **paginación** para manejar grandes volúmenes
- Se permite aplicar **filtros por rango de fechas**
- Los datos provienen de la base de datos PostgreSQL usando Supabase
- El endpoint del backend deberá aceptar parámetros de filtrado y paginación
- La visualización está diseñada con **Next.js, Tailwind y shadcn/ui**

---

## 🧪 Pruebas Recomendadas

- Visualizar listado con y sin estar autenticado
- Verificar anonimato en modo no registrado
- Probar filtros por fechas
- Paginación correcta entre distintas páginas
- Orden correcto por "Fecha desde"