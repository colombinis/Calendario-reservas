# Issue 07 – Implementación de Pruebas del Sistema

## 🎯 Objetivo

Establecer una estrategia de testing base para cubrir las funcionalidades clave del sistema y asegurar la calidad del código a lo largo del desarrollo.

---

## 🧪 Alcance Inicial

Las pruebas deben cubrir:

1. **Autenticación:**
   - Registro con datos válidos e inválidos
   - Login con contraseña, Google y link por email
   - Manejo de errores (intentos fallidos, links expirados, Google cancelado)

2. **Calendario:**
   - Selección de fechas válidas
   - Manejo de solapamientos
   - Restricciones por fechas pasadas
   - Colores y estados visuales correctos

3. **Listado de reservas:**
   - Filtros por fecha
   - Anonimato en usuarios no autenticados
   - Orden y paginación correctos

---

## 🧰 Herramientas Recomendadas

- [`@testing-library/react`](https://testing-library.com/docs/react-testing-library/intro/) para pruebas de componentes
- [`vitest`](https://vitest.dev/) como runner de pruebas y mocks
- [`playwright`](https://playwright.dev/docs/intro) (opcional) para pruebas end-to-end si se desea simular flujos completos

---

## ✅ Criterios Técnicos

- Las pruebas unitarias deben ubicarse dentro de la carpeta `/tests/`
- Los archivos seguirán el patrón `*.test.ts` o `*.spec.ts`
- El sistema debe incluir un comando en `package.json` para correr todas las pruebas:  
  `"test": "vitest run"`
- Se debe integrar verificación automática en CI/CD (en GitHub Actions, por ejemplo)
- El objetivo inicial es cubrir al menos **las historias de usuario 01 a 05**

---

## 📌 Recomendaciones

- Evitar mocks innecesarios: priorizar pruebas realistas y enfocadas en comportamiento
- Simular flujos de usuario completos desde el punto de vista funcional
- Agregar pruebas nuevas para cada feature implementada (no dejar cobertura rezagada)