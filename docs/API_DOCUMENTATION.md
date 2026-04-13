# API Documentation

Base URL: `http://localhost:8080/api`

## Authentication

### `POST /api/auth/login`
- **Request Body**: `{ "username": "admin", "password": "password" }`
- **Response**: `{ "token": "jwt-token-string" }`

## Projects

### `GET /api/projects`
- **Response**: `[ { id, title, description, image_url, tech_stack, github_link, live_link } ]`

### `POST /api/projects` (Requires Admin Token)
- **Request Body**: `{ "title": "...", "description": "...", ... }`
- **Response**: Created Project Object

### `PUT /api/projects/{id}` (Requires Admin Token)
- **Request Body**: Updated Project Object
- **Response**: Updated Project Object

### `DELETE /api/projects/{id}` (Requires Admin Token)

*(Same CRUD pattern applies to Skills, Internships, Certifications, Achievements, Blogs)*

## Content APIs

- **Skills**: `/api/skills`
- **Internships**: `/api/internships`
- **Certifications**: `/api/certifications`
- **Achievements**: `/api/achievements`
- **Blogs**: `/api/blogs`
- **About**: `/api/about` (GET single config object, PUT to update object)

## Contact Form

### `POST /api/contact`
- **Request Body**: `{ "name": "John Doe", "email": "john@example.com", "message": "Hello!" }`
- **Response**: `{ "message": "Message sent successfully" }` (HTTP 201)

### `GET /api/contact` (Requires Admin Token)
- **Response**: `[ { id, name, email, message, date } ]`

## Secure Endpoints (Requires Admin Token)
All `POST`, `PUT`, `DELETE` endpoints and reading messages require an `Authorization` header:
```
Authorization: Bearer <jwt-token-string>
```
