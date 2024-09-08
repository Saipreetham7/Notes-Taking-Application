# Notes-Taking Application

## Overview
The web-based platform of the note-taking application enables users to create, edit, and manage notes. With user authentication supported by the application, users can create an account, log in, and safely manage their notes in a personalized environment. Notes are kept in a database so they can be retrieved and kept permanently. With its simple, easy-to-use interface, the application makes it simple for users to efficiently organize their notes.

### Features

<ul>
  <li>User authentication and authorization.</li>
  <li>Create, read, update, and delete notes.</li>
  <li>Responsive user interface.</li>
  <li>Backend API to handle note operations.</li>
  <li>Persistent storage using MongoDB.</li>
</ul>

## Repository Structure

```plaintext
note-taking-app/
│
├── frontend/                  # React Frontend application
│   ├── Dockerfile
│   ├── public/
│   └── src/
│
├── backend/                   # Express.js Backend application
│   ├── Dockerfile
│   ├── routes/
│   └── models/
│
├── kubernetes/                # Kubernetes configuration files
│   ├── frontend-deployment.yaml
│   ├── backend-deployment.yaml
│   └── mongodb-deployment.yaml
│
├── README.md                  # Documentation
└── .gitignore                 # Ignore node_modules and other files
```

## Prerequisites
To run this application, ensure you have the following installed:
  1. Docker: <a href="https://docs.docker.com/engine/install/">Install Docker</a>
  2. Kubernetes: <a href="https://kubernetes.io/releases/download/">Install Kubernetes</a>
  3. kubectl: <a href="https://kubernetes.io/docs/tasks/tools/">Install kubectl</a>

## Running Locally
### Clone the Repository
```shell
git clone https://github.com/yourusername/note-taking-app.git
cd note-taking-app
```

### 1. Running with Docker
You can run the application using Docker Compose or individual Docker commands.
#### Build and Run the Containers
```shell
# Build the frontend and backend Docker images
docker build -t note-app-frontend ./frontend
docker build -t note-app-backend ./backend

# Run MongoDB container
docker run --name note-mongodb -d -p 27017:27017 mongo

# Run backend container
docker run --name note-backend -d -p 8080:8080 -e MONGO_URI=mongodb://note-mongodb:27017/noteapp note-app-backend

# Run frontend container
docker run --name note-frontend -d -p 3000:80 note-app-frontend
```
#### Access the Application
<ul>
  <li>Frontend: <a href="http://localhost:3000">http://localhost:3000</a></li>
  <li>Backend API: <a href="http://localhost:8080">http://localhost:8080</a></li>
</ul>

### 2. Running with Kubernetes
You can deploy the application using Kubernetes for scalability.
#### 1. Deploy the Frontend, Backend, and MongoDB on Kubernetes
First, make sure your Kubernetes cluster is running, then apply the Kubernetes YAML files:
```shell
# Apply MongoDB deployment
kubectl apply -f kubernetes/mongodb-deployment.yaml

# Apply Backend deployment
kubectl apply -f kubernetes/backend-deployment.yaml

# Apply Frontend deployment
kubectl apply -f kubernetes/frontend-deployment.yaml
```
#### 2. Check Status
```shell
kubectl get pods
kubectl get services
```
Once the pods and services are running, you can access the frontend through the external IP provided by the LoadBalancer.
