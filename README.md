# Futuristic Full Stack Portfolio

A production-ready Full Stack Portfolio Web Application for a B.Tech Computer Science (AI & ML) student.
Built with React (Vite) and Spring Boot (Java), featuring an ultra-modern futuristic UI with dark theme, glassmorphism, Framer Motion animations, and a secret admin dashboard.

## Tech Stack
- **Frontend**: React 18, Vite, Vanilla CSS Modules (No Tailwind), React Router, Framer Motion, Axios, Chart.js
- **Backend**: Spring Boot 3.2.x, Java 17, Spring Security (JWT), Spring Data JPA
- **Database**: MySQL

## Complete Folder Structure
```
portfolio-app/
├── backend/                  # Spring Boot backend application
│   ├── src/main/java/com/portfolio/backend/
│   │   ├── config/           # Security, CORS configurations
│   │   ├── controller/       # REST API Endpoints
│   │   ├── model/            # JPA Entities
│   │   ├── repository/       # Data Access Layer
│   │   ├── security/         # JWT filters and services
│   │   └── service/          # Business logic
│   └── src/main/resources/   # application.properties
│
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── assets/           # Images, icons
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Page components (Home, Admin, etc.)
│   │   ├── context/          # React context (Auth)
│   │   ├── services/         # Axios API calls
│   │   ├── styles/           # Global CSS and CSS Modules
│   │   └── App.jsx           # Main routing and layout
│   └── package.json          # Dependencies
│
├── docs/                     # Project documentation
│   ├── API_DOCUMENTATION.md
│   ├── DATABASE_SCHEMA.md
│   └── DEPLOYMENT_GUIDE.md
└── README.md
```

## Environment Variable Setup

### Backend (`backend/src/main/resources/application.properties`)
Update the following properties to match your local setup:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/portfolio_db
spring.datasource.username=root
spring.datasource.password=root
# Change this secret for production!
jwt.secret=9a4f2c8d3b7a1e6f45c8a0b3f267d8b1d4e6f3c8a9d2b5f8e3a9c8b5f6v8a3d9
```

### Frontend (`frontend/.env`)
Create a `.env` file in the `frontend` root:
```env
VITE_API_BASE_URL=http://localhost:8080
VITE_GITHUB_USERNAME=yourgithubusername
```

## Running Locally
1. Run `CREATE DATABASE portfolio_db;` in your local MySQL instance.
2. Start the Backend:
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```
3. Start the Frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Admin Access
- **URL**: Navigate to `/admin`
- **Frontend Hardcoded Password For Testing**: `admin` / `secret2025`
- Note: This will be connected to the Spring Boot JWT backend API ultimately.
