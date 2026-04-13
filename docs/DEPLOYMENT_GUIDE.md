# Deployment Guide

This guide explains how to deploy the Full Stack Portfolio application to production.

## 1. Backend Deployment (Render or Railway)

### Prerequisites
- A remote MySQL Database (e.g., Aiven, PlanetScale, AWS RDS, or Render MySQL).
- A Render or Railway account.

### Steps
1. Push your `backend` folder to a GitHub repository.
2. In Render/Railway, create a new "Web Service".
3. Connect your GitHub repository.
4. Set the Root Directory to `backend` (if using a monorepo).
5. Build Command: `./mvnw clean package -DskipTests`
6. Start Command: `java -jar target/backend-0.0.1-SNAPSHOT.jar`
7. Set Environment Variables:
   - `SPRING_DATASOURCE_URL`: jdbc:mysql://<your-db-host>:<port>/portfolio_db
   - `SPRING_DATASOURCE_USERNAME`: <db-username>
   - `SPRING_DATASOURCE_PASSWORD`: <db-password>
   - `JWT_SECRET`: <generate-a-long-random-string>
   - `FRONTEND_URL`: <your-frontend-deployment-url>

## 2. Frontend Deployment (Vercel or Netlify)

### Prerequisites
- A Vercel or Netlify account.
- The deployed backend URL from step 1.

### Steps
1. Push your `frontend` folder to a GitHub repository.
2. In Vercel/Netlify, create a new Project and select your repository.
3. Set the Root Directory to `frontend`.
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Set Environment Variables:
   - `VITE_API_BASE_URL`: <your-backend-deployment-url> (e.g., `https://portfolio-backend.onrender.com`)
7. Click Deploy.

## 3. Post-Deployment
- Access the app via the Vercel/Netlify URL.
- Test the contact form and make sure data reaches the backend.
- Access the secret admin panel (Ctrl + Shift + A or `/admin-panel-8472`) and configure your initial data.
