# Deployment Guide: Portfolio App on Amazon EC2 (Ubuntu)

This guide provides step-by-step instructions to deploy your portfolio application using Docker Compose. This method ensures that the frontend, backend, and database all work together seamlessly without manual configuration on the server.

## Prerequisites

1.  An Amazon EC2 Instance running **Ubuntu**.
2.  **Security Group** rules allowing:
    *   Port 80 (HTTP)
    *   Port 22 (SSH)
    *   Port 8080 (Optional, for direct backend access)

---

## Step 1: Connect to your EC2 Instance

Use SSH to connect to your instance:

```bash
ssh -i your-key.pem ubuntu@your-ec2-public-ip
```

---

## Step 2: Prepare the Server

Upload your project files to the EC2 instance or clone them from GitHub. 
Then, run the setup script to install Docker and Docker Compose:

```bash
chmod +x setup_ec2.sh
./setup_ec2.sh
```

---

## Step 3: Configure Environment (Optional)

If you have a custom GitHub token or specific database passwords, you can edit the `docker-compose.yml` file on the server.

The current configuration uses:
*   **Database:** `portfolio`
*   **Username:** `mouli`
*   **Password:** `password`

---

## Step 4: Launch the Application

Run the following command to build and start all services in the background:

```bash
sudo docker-compose up --build -d
```

### What this does:
1.  **MySQL Database:** Starts a container for your data.
2.  **Spring Boot Backend:** Builds the Java app and connects it to MySQL.
3.  **React Frontend:** Builds the React app, optimizes it for production, and serves it via **Nginx**.
4.  **Nginx Proxy:** Nginx is configured to serve the frontend on port 80 and automatically route all `/api` requests to the backend. This **fixes CORS issues** permanently.

---

## Step 5: Verify Deployment

Open your browser and navigate to your EC2 Public IP address:
`http://your-ec2-public-ip`

You should see your portfolio with:
*   Dynamic GitHub repositories (All 10+ repos fetched automatically).
*   Functional Projects and Skills sections.
*   Working Contact form.

---

## Troubleshooting

### View Logs
If something isn't working, check the logs:
```bash
sudo docker-compose logs -f
```

### Restart Services
```bash
sudo docker-compose restart
```

### Stop Everything
```bash
sudo docker-compose down
```
