# Documentation

## **Main Todo 1.1: Repository & Environment Setup**

### Sub-todo 1.1.1: Create GitHub Repository
- **What we did**: Created a GitHub repository, initialized it with a README and Node.js `.gitignore`, created `main` and `dev` branches, and set up branch protection for `main`.
- **Why**: To establish version control, enable collaboration, and ensure code quality through branch protection.

### Sub-todo 1.1.2: Set Up Project Directory Structure
- **What we did**: Created `backend/` and `frontend/` directories, initialized `backend` with `npm init -y`, and added subdirectories like `models`, `routes`, etc.
- **Why**: To organize the project for scalability and maintainability, separating backend and frontend concerns.

### Sub-todo 1.1.3: Environment Configuration
- **What we did**: Created `.env.example` as a template for environment variables, set up `.env` with actual values, and added `.env` to `.gitignore`.
- **Why**: To manage sensitive data securely and provide a clear setup guide for other developers.

---

## **Main-todo 1.2: Backend Dependencies Installation**

### Sub-todo 1.2.1: Install Core Dependencies
- **What we did**: 
  - Installed essential backend dependencies: `express`, `mongoose`, `bcryptjs`, `jsonwebtoken`, `cors`, `dotenv`, `helmet`, and `morgan`.
- **Why we did it**: 
  - These dependencies are required for building the backend API, handling authentication, securing HTTP requests, and connecting to the database.

### Sub-todo 1.2.2: Install Development Dependencies
- **What we did**: 
  - Installed development tools: `nodemon` for auto-restarting the server and `concurrently` for running multiple processes simultaneously.
- **Why we did it**: 
  - To streamline development by automating server restarts and enabling parallel execution of backend and frontend servers.

### Sub-todo 1.2.3: Install Rate Limiting and Validation
- **What we did**: 
  - Installed `@upstash/redis` for Redis integration, `express-validator` for input validation, and `express-rate-limit` for rate limiting API requests.
- **Why we did it**: 
  - To enhance security by preventing brute force attacks, validate user input, and integrate Redis for caching and rate limiting.

### Sub-todo 1.2.4: Configure `package.json` Scripts
- **What we did**: 
  - Added scripts to `package.json` for starting the server (`start`), running the server in development mode (`dev`), and a placeholder for tests (`test`).
- **Why we did it**: 
  - To simplify server management and ensure consistent commands for running the backend in different environments.

---

## **Main Todo 1.3: Database Setup**

### Sub-todo 1.3.1: MongoDB Atlas Setup
- **What we did**: Created a MongoDB Atlas cluster, configured network access, created a database user, and added the connection string to `.env`.
- **Why**: To set up a cloud-hosted database for storing application data securely and reliably.

### Sub-todo 1.3.2: Database Connection Configuration
- **What we did**: Created `config/database.js` with MongoDB connection logic, added error handling and connection logging, and tested the connection in `server.js`.
- **Why**: To establish a reliable connection to the database and handle potential errors gracefully.

### Sub-todo 1.3.3: Upstash Redis Setup
- **What we did**: Created an Upstash Redis database, retrieved the Redis URL and token, and added them to `.env`. Verified the connection in `server.js`.
- **Why**: To enable rate limiting and caching for improved performance and security.

---
