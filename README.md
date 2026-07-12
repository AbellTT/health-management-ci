# Student Health Management System (SHMS) for AASTU

**Version:** 1.0  
**Prepared for:** Addis Ababa Science and Technology University (AASTU)  
**Developed by:** Group 1

---

## Project Overview

The **Student Health Management System (SHMS)** is a web-based management system designed to streamline clinical workflows at AASTU University Health Services. SHMS provides secure management of student medical records, appointments, document storage, and automated certificate generation while supporting real-time queue management and health trend analytics.

### Key Goals

- Digitally manage student medical records and clinical visits.
- Enable role-based access for doctors, nurses, administrators, and system admins.
- Provide secure document storage with encrypted access.
- Generate official medical certificates automatically.
- Real-time queue and appointment management for students.
- Admin dashboards for health trend analysis and reporting.

---

## Features

### Functional Requirements

1. **Authentication & Authorization**: Role-based login for clinic staff (Doctors, Nurses, Admins).
2. **Student Registry**: Manage student demographic and academic info.
3. **Medical Records**: Create, update, and view chronological records.
4. **Document Management**: Secure storage of lab results, referrals, prescriptions, etc.
5. **Analytics Dashboard**: Identify health trends and recurring illnesses.
6. **Certificate Generation**: Generate PDFs for medical certificates.
7. **Search & Reporting**: Advanced search by student ID, diagnosis, or date.
8. **Audit Logging**: Immutable logs for all system actions.
9. **Queue Management**: Real-time digital queues for walk-in students.
10. **Appointment Scheduling**: Manage non-emergency appointments.

### Non-Functional Requirements

- **Security:** Encrypted data storage and HTTPS communication.
- **Performance:** Optimized queries and caching for fast response.
- **Usability:** Intuitive role-based interfaces with minimal training.
- **Availability:** Redundant servers and failover mechanisms.
- **Scalability:** Modular design allowing horizontal scaling.

---

## Project Structure

The project is structured as a mono-repository containing the frontend React application, the backend Node.js Express server, and multiple orchestration folders to support local and cloud deployments:

```text
Health-management/
├── backend/                  # Node.js + Express REST API
│   ├── configs/              # DB connections and environment configuration
│   ├── controllers/          # Route handlers (logic for auth, users, etc.)
│   ├── middlewares/          # Express middleware (JWT verification, error handling)
│   ├── models/               # Database tables setup, schema SQL, and seeding logic
│   ├── routes/               # Express routing path declarations
│   ├── services/             # Third-party utilities (SMTP email, AI APIs)
│   ├── test/                 # Test suites (unit & smoke tests)
│   ├── .dockerignore         # Excludes local files from backend image builds
│   ├── Dockerfile            # Image build blueprint for backend
│   └── index.js              # Entrypoint file for the API server
├── frontend/                 # React Frontend Client
│   ├── public/               # Static assets & index.html template
│   ├── src/                  # React source files
│   │   ├── Redux/            # Global state management (auth state, data fetching)
│   │   └── components_pages_services/ # UI views (Queue, Registration, Appointments, etc.)
│   ├── .dockerignore         # Excludes build logs/dependencies from frontend builds
│   └── Dockerfile            # Image build blueprint for frontend React app
├── day2-run/                 # Registry-only configuration files (pulls from Docker Hub)
├── day5-production/          # Local high-availability proxy & load balancer stack (Nginx, Prometheus, Grafana)
├── docker-compose.yml        # Main orchestration blueprint for local development
└── render.yaml               # Infrastructure-as-code for cloud deployment
```

### Folder Explanations

#### `backend/`

- **`configs/`**: Sets up PostgreSQL connection pooling (`db.js`) and environment wrappers (`config.js`) to securely load configuration variables at runtime.
- **`controllers/`**: Coordinates actions between the client routes and database models (e.g. log in users, register walk-ins, create appointments).
- **`middlewares/`**: Holds modular utility functions that intercept requests—such as authentication checking (`verifyToken`) and error handling formatting.
- **`models/`**: Manages the database structures. Includes scripts like `Staff.model.js` to create tables and automatically seed the default admin account.
- **`routes/`**: Maps API endpoints (e.g., `/auth/login`, `/patients/register`) to their corresponding controller logic.
- **`services/`**: Implements third-party connections. Includes the AI integration system for health chat features and the Nodemailer SMTP configuration.

#### `frontend/`

- **`src/Redux/`**: Manages state globally across React components. This includes holding logged-in staff tokens and caching lists of appointments/nurses.
- **`src/components_pages_services/`**: Holds specific page templates and sub-components for clinic roles:
  - **Nurse Portal:** Registration pages, walk-in queues, and appointment schedules.
  - **Doctor Portal:** Consultation logs, medical certificates, and analytics charts.
  - **AI Chat:** Interactive chat UI for answering clinical health trend queries.

---

## Tech Stack

- Backend: Node.js, Express, PostgreSQL, pg, Nodemailer
- Frontend: React, Redux
- Auth: JWT-based sessions per role

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 13+

### Install dependencies

- Backend:
  ```
  cd Backend
  npm install
  ```
- Frontend:
  ```
  cd FrontEnd
  npm install
  ```

### Run the apps

- Backend API: `npm start` from `Backend` (defaults to port 3007)
- Frontend UI: `npm start` from `FrontEnd` (defaults to port 3000)

## Useful Scripts

- `node createTable.js`: Apply `init_db.sql` to create all tables/views
- `npm start` (Backend): Start API server
- `npm start` (Frontend): Start React dev server

## Notes

- Email sending requires valid SMTP credentials; verification and credential emails are sent from the admin routes.
- If the API logs `relation ... does not exist`, rerun `node createTable.js` to ensure the schema is applied.
