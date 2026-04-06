# TheDrunked (Cocktailoo)

TheDrunked is a full-stack web application for discovering, creating, and managing cocktail recipes.  
It provides JWT-based authentication, user-owned recipes, ingredient-based discovery, tags, and likes.

## Tech Stack

- Backend: Java 22, Spring Boot 3, Spring Security, Spring Data JPA
- Database: PostgreSQL
- Frontend: React 18, TypeScript, Vite, Styled Components
- Testing: JUnit (backend), Vitest + Testing Library (frontend)

## Core Features

- User authentication (register/login) with JWT tokens
- Browse and manage cocktails
- Add and manage ingredients and tags
- Maintain a personal "My Bar" ingredient list
- Like/unlike cocktails and view like counts
- Upload and fetch cocktail-related files/images

## Project Structure

```text
.
├── src/                    # Spring Boot backend
├── frontend/               # React + Vite frontend
├── pom.xml                 # Backend build configuration
├── mvnw / mvnw.cmd         # Maven wrappers
└── README.md
```

## Prerequisites

- Java 22
- Node.js 18+ and npm
- PostgreSQL (running locally)

## Configuration

### Backend (`src/main/resources/application.properties`)

Configure at least:

- `spring.datasource.url`
- `spring.datasource.username`
- `spring.datasource.password`
- `spring.app.jwtSecret`
- `file.upload-dir`

Current defaults are intended for local development only.

### Frontend (`frontend/.env`)

Create/update:

```bash
VITE_API_URL="http://localhost:8080/"
```

## Running Locally

### 1) Start backend

From repository root:

```bash
./mvnw spring-boot:run
```

On Windows (PowerShell):

```powershell
.\mvnw.cmd spring-boot:run
```

Backend default address: `http://localhost:8080`

### 2) Start frontend

From `frontend/`:

```bash
npm install
npm run dev
```

Frontend default address: `http://localhost:5173`

## Testing

### Backend tests

From repository root:

```bash
./mvnw test
```

Windows (PowerShell):

```powershell
.\mvnw.cmd test
```

### Frontend tests

From `frontend/`:

```bash
npm test
```

Watch mode:

```bash
npm run test:watch
```

## API Overview

Public endpoints include:

- `POST /register`
- `POST /authenticate`

Authenticated endpoints are grouped under `/user/**` (with role-based access control for `/admin/**`).

## Screenshots

- Homepage  
  ![Homepage](https://github.com/user-attachments/assets/56c62d17-f127-47ca-82f4-a04884190527)

- Search by Name  
  ![Search by Name](https://github.com/user-attachments/assets/59c6658e-bfd6-4877-b405-9e3e97f7349c)

- Search by Ingredients  
  ![Search by Ingredients](https://github.com/user-attachments/assets/95eb4fba-a375-4eaf-8de1-bd193e0ad4f5)

- Add Cocktails  
  ![Add Cocktails](https://github.com/user-attachments/assets/a611cb70-f50a-4022-80c4-dc1b59828600)
