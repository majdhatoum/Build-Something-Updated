# Microservice-based Application: Build Something Updated

This README file will guide you through the structure, setup, and deployment of the microservice-based application. The application consists of two backend services (User and Product Services), a frontend built with React, and a MongoDB database. The services are all containerized using Docker and deployed with Kubernetes.

## Application Overview

The application is built using microservice architecture and follows cloud-native best practices:

- **User Service**: Manages user operations, such as adding and retrieving users.
- **Product Service**: Manages product operations, such as adding and retrieving products.
- **Frontend**: Built using React to interact with the user and product services.
- **MongoDB**: Database used for storing user and product data, running as a separate microservice.

## Technologies Used
- **Backend**: Flask (Python)
- **Frontend**: React.js
- **Database**: MongoDB
- **Containerization**: Docker
- **Orchestration**: Kubernetes (Minikube)

## Folder Structure
- `user-service/`: Contains the user service source code (`app.py`, `Dockerfile`, `requirements.txt`).
- `product-service/`: Contains the product service source code (`app.py`, `Dockerfile`, `requirements.txt`).
- `frontend/`: Contains the React-based frontend application.
- `k8s-config/`: Contains the Kubernetes deployment files for each microservice (`user-service.yaml`, `product-service.yaml`, `frontend.yaml`, `mongo-deployment.yaml`, `ingress.yaml`).

## Prerequisites

Before starting, ensure you have the following installed:

- **Docker**: For building container images.
- **Minikube**: For running Kubernetes locally.
- **kubectl**: For managing Kubernetes resources.
- **Node.js and npm**: For running and building the frontend application.

## Setup Instructions

### 1. Clone the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/majdhatoum/Build-Something-Updated.git
cd Build-Something-Updated
```

### 2. Build and Push Docker Images

Build the Docker images for each microservice and push them to Docker Hub:

```bash
# Navigate to each service directory and build/push images
cd user-service
# Build and push user service image
docker build -t majdhatoum/user-service:latest .
docker push majdhatoum/user-service:latest

cd ../product-service
# Build and push product service image
docker build -t majdhatoum/product-service:latest .
docker push majdhatoum/product-service:latest

cd ../frontend
# Build and push frontend image
docker build -t majdhatoum/frontend:latest .
docker push majdhatoum/frontend:latest
 ```

### 3. Start Minikube

Start Minikube to deploy the services:

```bash
minikube start
```

### 4. Apply Kubernetes Configurations

Navigate to the k8s-config folder and apply the Kubernetes deployment files:

```bash
cd ../k8s-config
kubectl apply -f mongo-deployment.yaml
kubectl apply -f user-service.yaml
kubectl apply -f product-service.yaml
kubectl apply -f frontend.yaml
kubectl apply -f ingress.yaml
```

### 5. Access The Application

To access the frontend service:

1. Enable the Minikube Ingress addon if you haven't already:

```bash
minikube addons enable ingress
```

2. Update your /etc/hosts file to route myapp.local to Minikube's IP address. Run the following command to get the IP address:

```bash
minikube ip
```
Edit your /etc/hosts file to include:

```bash
<MINIKUBE_IP> myapp.local
```

3. Access the application at http://myapp.local.

