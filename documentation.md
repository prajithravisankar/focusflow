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

## **Main Todo 2.1: User Model and Validation**

### Sub-todo 2.1.1: Create User Schema (models/User.js)
- **What we did**: Defined the `User` schema with fields for `firstName`, `lastName`, `email`, `password`, and `createdAt`. Added password hashing middleware using `bcrypt` and implemented a method to compare hashed passwords.
- **Why**: To securely store user data and enable authentication by hashing passwords and validating user credentials.

### Sub-todo 2.1.2: Input Validation Setup (utils/validation.js)
- **What we did**: Created validation schemas for registration and login using `express-validator`. Added rules for email format, password strength, and name field requirements.
- **Why**: To ensure user input is valid and meets the application's requirements before processing.

### Sub-todo 2.1.3: Test User Model
- **What we did**: Tested the `User` model by creating a test user document in MongoDB, verifying password hashing, and testing validation rules with invalid and valid data.
- **Why**: To confirm that the `User` model and validation logic work as expected, ensuring data integrity and security.

---

## **Main Todo 2.2: JWT System Implementation**

### Sub-todo 2.2.1: JWT Utility Functions
- **What we did**: Created utility functions in `utils/jwt.js` to generate, verify, and decode JSON Web Tokens (JWTs). Token expiration for the hackathon is set to 10 days for now.
- **Why**: To enable secure user authentication and authorization by generating tokens that can be used to verify user identity.

### Sub-todo 2.2.2: Auth Middleware
- **What we did**: Implemented middleware in `middleware/auth.js` to extract JWTs from the `Authorization` header, verify the token, and attach decoded user information to the request object.
- **Why**: To secure protected routes by ensuring only authenticated users with valid tokens can access them.

### Sub-todo 2.2.3: Test JWT System
- **What we did**: Added test routes in `server.js` to generate tokens and test the middleware. Verified that valid tokens grant access to protected routes, while invalid or missing tokens return a `401 Unauthorized` response.
- **Why**: To ensure the JWT system works as expected and provides secure access control for protected resources.

---

## **Main Todo 2.3: Authentication Endpoints**

### Sub-todo 2.3.1: Registration Endpoint (POST /api/auth/register)
- **What we did**: Implemented the registration endpoint to validate input data, check if the user already exists, hash the password, create a user document, and return a JWT token along with user data (excluding the password).
- **Why**: To allow new users to securely register and create accounts in the system.

### Sub-todo 2.3.2: Login Endpoint (POST /api/auth/login)
- **What we did**: Implemented the login endpoint to validate email and password, verify user credentials, generate a JWT token, and return user data with the token.
- **Why**: To enable users to securely log in and access their accounts.

### Sub-todo 2.3.3: Profile Endpoint (GET /api/auth/profile)
- **What we did**: Implemented the profile endpoint to retrieve the current user's information using the token. Protected the route with `authMiddleware` and excluded the password from the response.
- **Why**: To provide authenticated users with access to their profile information securely.

### Sub-todo 2.3.4: Auth Controller
- **What we did**: Moved all authentication logic (registration, login, and profile) into `authController.js`. Added proper error handling, consistent response formatting, and logging for authentication attempts.
- **Why**: To organize the codebase, improve maintainability, and ensure consistent error handling and response formatting.

---