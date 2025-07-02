# Issue 06 – Estructura de Carpetas del Proyecto

## 📁 Objetivo

Definir una estructura de carpetas clara preparada para ser analizaza por LLM y que permita ser escalable.
Por escalable entendemos que empezamos implementando funcionalidades y luego se iran agregando mas funcionalidades, donde la estructura de carpeta debe ser clara la division del proyecto.

Tener en cuenta que se utilizaran las siguientes tecnologias y servicios:
Para el frontend utilizaremos  **Next.js**, **TypeScript**, **TailwindCSS**
Para el backend  utilizaremos   **Express**, **TypeScript**
Servicios externos que se utilizaran 
**Supabase** (PostgreSQL + Auth + Storage)
**Google Login** (social login)
**Resend**: (emails and on time link password)
**Tests**: Playwright

---

## 🗂️ Estructura Propuesta
project-root/
├── src/
│   ├── frontend/                    # frontend Next.js framework
│   ├── utils/                   # shared utilities functions 
│   └── backend/                   # backend Express framework
├── tests/
│   ├── unit/                    # Unit tests
│   ├── integration/             # Integration tests
│   ├── performance/             # Performance tests
│   └── fixtures/                # Test data and mocks
└── docs/                        # Comprehensive documentation
│   ├── PRD.md       # Product Requirement Document
│   ├── key-concepts.md          # WordPress testing concepts
│   ├── code-patterns.md         # Common patterns and conventions
│   ├── decision-log.md          # Why certain approaches were chosen
│   ├── README.md                 # Project overview and quick start
│   ├── ARCHITECTURE.md          # System design and components
│   ├── TESTING_GUIDE.md         # Complete testing documentation
│   ├── API_REFERENCE.md         # Code API documentation
│   ├── TROUBLESHOOTING.md       # Common issues and solutions
│   ├── CHANGELOG.md             # Version history and changes
│   ├── examples/
│   │   ├── basic-setup/         # Minimal working examples
│   │   ├── advanced-config/     # Complex configurations
│   │   └── integration-examples/ # Real-world use cases
