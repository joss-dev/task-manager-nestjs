# Task Manager API

API RESTful para la gestión de tareas, desarrollada con NestJS y PostgreSQL. Incluye autenticación JWT, notificaciones, validaciones robustas, pruebas unitarias/e2e y patrones de diseño (Repository, Factory, Strategy).

---

## 🚀 Tecnologías Utilizadas

- **Node.js** (v18+ recomendado)
- **NestJS** (v11)
- **TypeScript**
- **PostgreSQL** (v15, vía Docker)
- **TypeORM**
- **JWT** (Autenticación)
- **Docker & Docker Compose**
- **Jest** (Pruebas unitarias y e2e)
- **Swagger** (Documentación OpenAPI)
- **Event Emitter** (Notificaciones internas)

---

## 📦 Requisitos Previos

- [Node.js](https://nodejs.org/) (v18 o superior)
- [npm](https://www.npmjs.com/) (v9 o superior)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## ⚙️ Instalación y Configuración

1. **Clona el repositorio:**
   ```bash
   git clone <REPO_URL>
   cd task-manager
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno:**
   Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido (ajusta según tus necesidades):
   ```env
   POSTGRES_HOST=localhost
   POSTGRES_PORT=5433
   POSTGRES_USER=user_crud
   POSTGRES_PASSWORD=root
   POSTGRES_DB=db_crud
   JWT_SECRET=supersecretkey
   JWT_EXPIRES_IN=3600s
   ```

4. **Levanta la base de datos con Docker Compose:**
   ```bash
   docker-compose up -d
   ```
   Esto creará un contenedor PostgreSQL accesible en el puerto 5433.

---

## ▶️ Ejecución del Proyecto

- **Desarrollo:**
  ```bash
  npm run start:dev
  ```
- **Producción:**
  ```bash
  npm run build
  npm run start:prod
  ```

---

## 🧪 Pruebas

- **Unitarias:**
  ```bash
  npm run test
  ```
- **Cobertura:**
  ```bash
  npm run test:cov
  ```
- **End-to-End (e2e):**
  ```bash
  npm run test:e2e
  ```

---

## 📖 Documentación de la API (Swagger)

Una vez el servidor esté corriendo, accede a la documentación interactiva en:

```
http://localhost:3000/api
```

Aquí podrás probar los endpoints, ver los modelos y los esquemas de autenticación.

---

## 🔑 Variables de Entorno

| Variable           | Descripción                        | Valor por defecto |
|--------------------|------------------------------------|-------------------|
| POSTGRES_HOST      | Host de la base de datos           | localhost         |
| POSTGRES_PORT      | Puerto de PostgreSQL               | 5433              |
| POSTGRES_USER      | Usuario de PostgreSQL              | user_crud         |
| POSTGRES_PASSWORD  | Contraseña de PostgreSQL           | root              |
| POSTGRES_DB        | Nombre de la base de datos         | db_crud           |
| JWT_SECRET         | Clave secreta para JWT             | supersecretkey    |
| JWT_EXPIRES_IN     | Tiempo de expiración del token     | 3600s             |

---

## 🗂️ Estructura del Proyecto

```
├── src/
│   ├── auth/           # Módulo de autenticación (JWT)
│   ├── tasks/          # Módulo de tareas (CRUD, patrones)
│   ├── users/          # Módulo de usuarios
│   ├── notifications/  # Notificaciones internas
│   ├── common/         # Utilidades y decoradores
│   ├── events/         # Eventos y listeners
│   └── main.ts         # Bootstrap principal
├── test/               # Pruebas e2e
├── docker-compose.yml  # Orquestación de servicios
├── package.json        # Dependencias y scripts
└── README.md           # Documentación
```

---

## 🏗️ Patrones de Diseño Aplicados

- **Repository Pattern:** Abstracción de acceso a datos para tareas y usuarios.
- **Factory Pattern:** Creación de entidades de tarea desacoplada.
- **Strategy Pattern:** Estrategias para notificaciones.

---

## 🛡️ Seguridad y Buenas Prácticas

- Autenticación y autorización con JWT.
- Validaciones exhaustivas con `class-validator`.
- Manejo de errores y respuestas consistentes.
- Pruebas unitarias y de integración robustas.
- Variables sensibles fuera del código fuente.

---

## 📬 Notificaciones

El sistema emite eventos internos (ej: creación/actualización de tareas) usando `@nestjs/event-emitter`.

---

