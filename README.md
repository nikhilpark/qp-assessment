# Your Project Name

Brief description of your project.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installing Dependencies](#installing-dependencies)
  - [Setting Up the Database](#setting-up-the-database)
  - [Running the Application](#running-the-application)
- [Dockerization](#dockerization)
  - [Building Docker Image](#building-docker-image)
  - [Running Docker Container](#running-docker-container)


---

## Getting Started

### Prerequisites
Node.js installed


### Installing Dependencies

```bash
# Install project dependencies
npm install
```
### Setting Up the Database

```bash
#Seed the database
npm run seed
```

###Running the Application

```bash
# Run the application
npm start
```
## Dockerization

### Building Docker image

```bash
docker build -t your-app-name .
```

### Running Docker Container

```bash
docker run -p 3000:3000 your-app-name
```
