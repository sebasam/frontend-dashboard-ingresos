# Frontend Dashboard Ingresos

Frontend de la aplicación **Dashboard de Ingresos y Gastos**, encargado de mostrar, crear, editar y reportar transacciones de manera visual.

---

## Tecnologías utilizadas

| Tecnología | Propósito |
|------------|-----------|
| **React** | Biblioteca para construir interfaces de usuario reactivas y componentes reutilizables. |
| **TypeScript** | Tipado estático para mayor seguridad y autocompletado en el desarrollo. |
| **Vite** | Herramienta de bundling rápida para desarrollo y producción. |
| **MUI (Material-UI)** | Biblioteca de componentes UI para estilos consistentes y responsivos. |
| **React Router** | Manejo de rutas SPA para navegar entre páginas de transacciones y reportes. |
| **Recharts** | Librería para gráficos (Pie, Bar) de ingresos vs gastos y transacciones por fecha. |
| **Axios** | Cliente HTTP para conectarse al backend y consumir APIs. |
| **zustand** (si se usa) | Manejo de estado global de autenticación o filtros. |

---

## Arquitectura y Patrones de Diseño

1. **Separación por componentes**
   - **Pages:** Componentes de página (TransactionsList, TransactionsPage, Reports).  
   - **Components:** Inputs, botones, formularios reutilizables, tablas y gráficas.  
   - **Services:** Lógica de conexión con el backend (API REST).  

2. **Patrones implementados**
   - **Container / Presentational:** Pages actúan como contenedores, mientras Components como presentacionales.  
   - **Service Layer:** Funciones de `transactionService` centralizan las llamadas HTTP, evitando duplicar lógica en componentes.  
   - **Hooks y Efectos:** `useEffect` para cargar datos y sincronizar el estado con el backend.  
   - **Controlled Components:** Formularios controlados para manejar inputs de manera predecible.  

3. **Principios de desarrollo**
   - **POO y modularidad:** Aunque React es funcional, se usan **objetos y tipos** en TypeScript para estructurar datos (`Transaction`, `TransactionResponse`).  
   - **DRY:** Componentes reutilizables y servicios centralizados.  
   - **SOLID:**
     - **S (Single Responsibility):** Cada componente tiene una responsabilidad clara.  
     - **O (Open/Closed):** Los componentes se pueden extender (props) sin modificar el código interno.  
     - **L (Liskov Substitution):** Components intercambiables usando props tipadas.  
     - **I (Interface Segregation):** Props específicas para cada componente, evitando interfaces enormes.  
     - **D (Dependency Inversion):** Components dependen de abstracciones (services) en vez de implementaciones concretas de API.  

---


---

## Funcionalidades

- **Transacciones**
  - Crear, editar y eliminar transacciones.
  - Campos: tipo, monto, fecha, categoría opcional, descripción opcional.
- **Listados**
  - Tabla de transacciones con paginación y filtros (opcional).
  - Botones para editar y eliminar cada transacción.
- **Reportes**
  - Pie chart de ingresos vs gastos.
  - Bar chart de transacciones por fecha.
  - Botón para exportar CSV desde el backend.
- **Autenticación**
  - JWT almacenado en localStorage.
  - Interceptor de Axios agrega token a cada request.

---

## Instalación y ejecución

1. Clonar el repositorio:

```bash
git clone https://github.com/sebasam/frontend-dashboard-ingresos
cd frontend-dashboard-ingresos
npm install
```

2. Ejecutar servidor de desarrollo:

```bash
npm run dev
```


