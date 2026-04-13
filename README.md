# Full Stack Developer Portfolio

A modern, scalable full stack portfolio application built using React, Spring Boot, and MySQL. It is designed to showcase projects, skills, achievements, and integrations such as GitHub analytics.

---

## Tech Stack

### Frontend

* React.js
* CSS Modules
* Framer Motion

### Backend

* Spring Boot
* REST APIs
* Spring Security (JWT Authentication)

### Database

* MySQL
* Database Name: `portfoli_db`

---

## Features

* Dynamic portfolio with real-time data
* GitHub analytics integration
* Resume download and preview
* Certifications and internship proof preview (PDF viewer)
* Skills categorized with progress indicators
* Blog/article section with detailed pages
* Contact form with backend integration
* Secure backend with JWT authentication

---

## Project Structure

```
portfolio-app/
├── frontend/ (React)
├── backend/ (Spring Boot)
├── uploads/ (PDF files - resumes, certificates)
```

---

## Getting Started

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

Runs on: http://localhost:5137

---

### Backend Setup

```bash
cd backend
mvn spring-boot:run
```

Runs on: http://localhost:8080

---

### Database Setup

Create database:

```sql
CREATE DATABASE portfoli_db;
```

Update credentials in:

```properties
application.properties
```

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/portfoli_db
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
```

---

## Available Scripts (Frontend)

### npm start

Runs the app in development mode.

### npm test

Launches the test runner.

### npm run build

Builds the app for production.

### npm run eject

Ejects configuration (irreversible).

---

## Key Functional Modules

* Projects showcase
* Skills visualization
* Achievements and certifications
* Blog system
* GitHub analytics dashboard
* Resume management system

---

## Highlights

* Smooth animations using Framer Motion
* Clean and modern UI design
* Modular and scalable backend architecture
* Real-world project implementations

---

## Deployment

Frontend:

* Vercel
* Netlify

Backend:

* Render
* Railway
* AWS

---

## Future Enhancements

* Multi-language support
* Advanced analytics dashboard
* Cloud file storage integration
* AI-powered portfolio assistant

---

### Built to showcase technical skills and real-world application development
