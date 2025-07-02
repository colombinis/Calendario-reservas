# Issue 04 – Selección de Fechas mediante Calendario

## 🧑‍💻 Historia de Usuario

**Como** usuario autenticado  
**Quiero** seleccionar un rango de fechas en un calendario  
**Para** reservar días disponibles sin superponerme con otros usuarios

---

## ✅ Criterios de Aceptación

- **Given** que accedí al sistema con éxito  
  **When** se carga la pantalla principal  
  **Then** veo un calendario que permite seleccionar fechas de inicio y fin

- **Given** que hay días ocupados por otros usuarios  
  **When** visualizo el calendario  
  **Then** los días aparecen:  
  - En **rojo** si ya están ocupados  
  - En **verde** si están disponibles  
  - En **amarillo** durante mi selección activa

- **Given** que navego el calendario  
  **When** busco fechas  
  **Then** puedo elegir desde un mes anterior al actual hasta 24 meses en el futuro

---

## ⚙️ Criterios Técnicos

- El componente de calendario se renderiza en el **servidor** con **Next.js + TypeScript + Tailwind** y componentes de **shadcn/ui**
- Las fechas seleccionadas se almacenan en una base de datos relacional (**PostgreSQL via Supabase**)
- **Validaciones previas a la confirmación de selección:**
  - No se permiten fechas en el pasado
  - No se permite seleccionar rangos que se solapen con los de otros usuarios
  - El sistema debe permitir seleccionar rangos contiguos pero no superpuestos
- **Control de concurrencia:**
  - Si dos usuarios intentan seleccionar el mismo rango en simultáneo, solo uno podrá confirmarlo
  - El segundo usuario recibirá un mensaje indicando que el rango ya no está disponible
- La acción de selección se registra en los **logs de auditoría** con los campos: usuario, fecha inicio, fecha fin, timestamp y éxito/error

---

## 🧪 Pruebas Recomendadas

- Seleccionar un rango de fechas válidas
- Intentar seleccionar fechas ya ocupadas
- Validar comportamiento al seleccionar fechas pasadas
- Simular dos usuarios seleccionando las mismas fechas al mismo tiempo
- Verificar visualización correcta de colores según estado
- Validar registro de log de selección exitosa y de error
