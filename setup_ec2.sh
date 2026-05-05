#!/bin/bash

# Update and install Docker
sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update
sudo apt-get install -y docker-ce docker-compose

# Start Docker
sudo systemctl start docker
sudo systemctl enable docker

# Instructions for the user
echo "-------------------------------------------------------"
echo "Docker and Docker Compose have been installed."
echo "To deploy your application, run:"
echo "sudo docker-compose up --build -d"
echo "-------------------------------------------------------"
