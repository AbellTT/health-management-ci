# Student Health Management System (SHMS) for AASTU

**Version:** 1.0  
**Prepared for:** Addis Ababa Science and Technology University (AASTU)  
**Developed by:** Group 1

---

## 🚀 Project Overview

The **Student Health Management System (SHMS)** is a web-based clinical management system designed to streamline workflows at AASTU University Health Services. 

Over the course of a 5-day structured development sprint, I successfully built, containerized, integrated, and deployed a highly available, production-ready version of this system.

---

## 📅 5-Day Development Progression

### Day 1: Project Setup and Initial Application Architecture
I established the core foundation of the application, splitting it into a distinct frontend (React/Redux) and backend (Node.js/Express/PostgreSQL).
- Designed the database schema for role-based access, patient records, and appointments.
- Developed REST APIs with JWT authentication.
- Built the interactive React frontend featuring role-specific portals for Doctors, Nurses, and Admins.

### Day 2: Multi-Container Dockerization and Docker Compose Setup
I transitioned the application from a local environment to a containerized infrastructure to guarantee consistency across all environments.
- Wrote multi-stage `Dockerfile`s for both frontend and backend to optimize build times and reduce image sizes.
- Orchestrated the entire stack using `docker-compose.yml`, networking the frontend, backend, and PostgreSQL database seamlessly.
- Externalized sensitive environment variables into secure `.env` files.
- Built and published my finalized Docker images to Docker Hub.

### Day 3: Implementation of Continuous Integration Pipeline
I established automated quality assurance and integration pipelines to ensure code reliability.
- Implemented a GitHub Actions workflow (`ci.yml`) triggered on pull requests and pushes to the `main` branch.
- Configured automated ESLint checks for both frontend and backend codebases.
- Integrated automated testing suites (Jest) to validate functionality before integration.

### Day 4: Continuous Deployment to Cloud (Render)
I achieved full Continuous Deployment (CD), transitioning from local testing to a live, scalable cloud environment.
- Wrote Infrastructure-as-Code (IaC) via a `render.yaml` configuration file.
- Deployed the PostgreSQL database, Node.js backend, and React frontend as distinct services on Render.
- Centralized secrets management using Render Environment Groups.
- Configured GitHub Actions to automatically trigger deployments via Webhooks upon successful CI pipeline completion.

### Day 5: Production Architecture, Load Balancing, and Observability
I upgraded the system to a highly available production architecture simulating enterprise-level traffic handling.
- **Load Balancing:** Introduced an Nginx reverse proxy to distribute traffic evenly across multiple replicas of the backend container using `least_conn`.
- **Monitoring Stack:** Integrated Prometheus to scrape time-series metrics from the infrastructure.
- **Data Visualization:** Provisioned Grafana with dynamic dashboards to visualize CPU, Memory, and Network usage for all running containers.
- **Infrastructure Metrics:** Configured cAdvisor, Node Exporter, and Nginx Exporter to feed granular host and container data into Prometheus.

---

## 🛠 Features Delivered

1. **Authentication & Authorization**: Role-based access control (Doctors, Nurses, Admins).
2. **Student Registry**: Complete management of student demographic and academic info.
3. **Medical Records**: Creation, updating, and viewing of chronological health records.
4. **Queue Management**: Real-time digital queues for walk-in students.
5. **Analytics Dashboard**: Trend identification and reporting interfaces.

---

## 🔒 Security & Operations Best Practices
- **No Hardcoded Secrets:** All database passwords and admin credentials are externalized into secure, `.gitignore`d environment files.
- **Immutable Infrastructure:** Application runs exactly the same in production as it does locally via strictly versioned Docker images.
- **Automated Quality Control:** CI pipelines block broken code from entering the main branch.
