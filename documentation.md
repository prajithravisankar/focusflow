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

## **Main Todo 2.4: Rate Limiting and Security Middleware**

### Sub-todo 2.4.1: Upstash Rate Limiting Setup
- **What we did**: Configured the Upstash Redis client in `config/upstash.js` and created rate-limiting middleware in `middleware/rateLimit.js`. Applied rate limits for login and registration endpoints:
  - **Login**: 5 attempts per 15 minutes per IP.
  - **Register**: 3 attempts per hour per IP.
- **Why**: To prevent abuse of the login and registration endpoints and enhance security.

### Sub-todo 2.4.2: Security Middleware Setup
- **What we did**: Added security-related middleware:
  - **Helmet**: To set secure HTTP headers.
  - **CORS**: Configured to allow requests from the frontend origin.
  - **Morgan**: Added request logging for better debugging and monitoring.
  - **Global Error Handling**: Implemented middleware to handle errors consistently across the application.
- **Why**: To improve the security and reliability of the backend.

### Sub-todo 2.4.3: Test Rate Limiting
- **What we did**: Tested the rate-limiting middleware:
  - Verified login rate limiting by sending multiple requests and confirmed the `429 Too Many Requests` response after exceeding the limit.
  - Verified registration rate limiting with the same behavior.
  - Tested CORS configuration to ensure requests from the frontend are allowed.
- **Why**: To ensure the rate-limiting and security middleware work as expected and protect the application from abuse.

---

## **Main Todo 3.1: Task Model Implementation**

### Sub-todo 3.1.1: Create Task Schema (models/Task.js)
- **What we did**: Created the `Task` schema in `models/Task.js` with the following fields:
  - `title`: Required, max length 200.
  - `description`: Optional, max length 1000.
  - `completed`: Boolean, defaults to `false`.
  - `userId`: References the `User` model to associate tasks with users.
  - `createdAt` and `updatedAt`: Automatically managed by Mongoose.
- **Why**: To define the structure of tasks in the database and ensure proper association with users.
- **Additional Features**:
  - Added an index on `userId` and `createdAt` for efficient querying and sorting.


### Sub-todo 3.1.2: Task Validation Rules (utils/validation.js)
- **What we did**: Added validation rules for tasks in `utils/validation.js`:
  - **Title**: Required, max length 200.
  - **Description**: Optional, max length 1000.
  - **Completed**: Optional, must be a boolean.
- **Why**: To ensure that only valid data is accepted when creating or updating tasks.


### Sub-todo 3.1.3: Test Task Model
- **What we did**: Created a test script (`testTaskModel.js`) to:
  - Create a sample user and associate tasks with the user.
  - Test task creation with valid data.
  - Query tasks by `userId` to verify ownership and association.
  - Test validation rules by attempting to create tasks with invalid data.
- **Why**: To verify that the Task model, user association, and validation rules work as expected.
- **Results**:
  - Successfully created valid tasks and associated them with a user.
  - Validation rules correctly prevented invalid tasks from being created.

---

## **Main Todo 3.2: Task Endpoints Implementation**

### Sub-todo 3.2.1: Create Task Endpoint (POST /api/tasks)
- **What we did**: Implemented the `POST /api/tasks` endpoint to allow users to create tasks.
  - Protected the route with `authMiddleware` to ensure only authenticated users can create tasks.
  - Validated task data (e.g., `title` is required).
  - Associated the task with the authenticated user using the `userId` field.
  - Returned the created task with a `201 Created` status code.
- **Why**: To enable users to create tasks and associate them with their accounts.


### Sub-todo 3.2.2: Get User Tasks Endpoint (GET /api/tasks)
- **What we did**: Implemented the `GET /api/tasks` endpoint to fetch tasks belonging to the authenticated user.
  - Protected the route with `authMiddleware` to ensure only authenticated users can access their tasks.
  - Queried tasks by the `userId` of the authenticated user.
  - Added sorting by creation date (newest first).
  - Included pagination with `page` and `limit` query parameters for large task lists.
- **Why**: To allow users to view their tasks efficiently, even with large task lists.


### Sub-todo 3.2.3: Update Task Endpoint (PUT /api/tasks/:id)
- **What we did**: Implemented the `PUT /api/tasks/:id` endpoint to allow users to update their tasks.
  - Protected the route with `authMiddleware` to ensure only authenticated users can update tasks.
  - Verified task ownership by checking the `userId` field.
  - Validated update data (e.g., `title`, `description`, and `completed`).
  - Updated specific fields of the task and returned the updated task with a `200 OK` status code.
- **Why**: To allow users to modify their tasks while ensuring security and data integrity.


### Sub-todo 3.2.4: Delete Task Endpoint (DELETE /api/tasks/:id)
- **What we did**: Implemented the `DELETE /api/tasks/:id` endpoint to allow users to delete their tasks.
  - Protected the route with `authMiddleware` to ensure only authenticated users can delete tasks.
  - Verified task ownership by checking the `userId` field.
  - Removed the task from the database and returned a success confirmation with a `200 OK` status code.
  - Handled errors for non-existent tasks or unauthorized access.
- **Why**: To allow users to delete tasks they no longer need while ensuring security and proper error handling.

---

## **Main Todo 3.3: Task Controller and Routes Integration**

### Sub-todo 3.3.1: Task Controller (controllers/taskController.js)
- **What we did**: Implemented all CRUD functions in `taskController.js`:
  - **Create Task**: Allows authenticated users to create tasks with user association.
  - **Get User Tasks**: Fetches tasks belonging to the authenticated user, with pagination and sorting by creation date.
  - **Update Task**: Updates specific fields of a task after verifying ownership.
  - **Delete Task**: Deletes a task after verifying ownership.
- **Why**: To centralize task-related logic and ensure proper error handling, validation, and user ownership verification.
- **Additional Features**:
  - Added consistent response formatting for all endpoints.
  - Included proper error handling for invalid requests and unauthorized access.

### Sub-todo 3.3.2: Task Routes Setup (routes/tasks.js)
- **What we did**: Created `routes/tasks.js` to define all task-related routes:
  - **POST /api/tasks**: Create a new task.
  - **GET /api/tasks**: Fetch tasks for the authenticated user.
  - **PUT /api/tasks/:id**: Update a specific task.
  - **DELETE /api/tasks/:id**: Delete a specific task.
- **Why**: To organize task-related routes and connect them to the corresponding controller functions.
- **Additional Features**:
  - Applied `authMiddleware` to protect all routes.
  - Used `taskValidation` and `validate` middleware to ensure input data is valid.

### Sub-todo 3.3.3: Integration with Main Server
- **What we did**: Integrated task routes into the main server:
  - Imported and mounted `routes/tasks.js` in `server.js` under the `/api/tasks` path.
  - Tested all endpoints using Postman/Thunder Client to ensure they work as expected.
  - Verified that authentication protection works by testing endpoints with and without valid tokens.
  - Tested error handling for invalid requests (e.g., missing fields, invalid task IDs).
- **Why**: To ensure task-related functionality is fully integrated into the backend and accessible via the API.

---

## **Main Todo 4.1: Session Model Implementation**

### Sub-todo 4.1.1: Create Session Schema (models/Session.js)
- **What we did**: Created the `Session` schema in `models/Session.js` with the following fields:
  - `taskId`: References the `Task` model. Required for focus sessions.
  - `userId`: References the `User` model. Required for all sessions.
  - `sessionType`: Specifies whether the session is a "focus" or "break". Allowed values are `focus` and `break`.
  - `duration`: The planned duration of the session (in minutes). Must be a positive number.
  - `actualDuration`: Tracks how much time was actually spent during the session. Defaults to `0`.
  - `startTime` and `endTime`: Timestamps for when the session starts and ends. Both are required.
  - `completed`: Indicates whether the session was completed. Defaults to `false`.
  - `pausedDuration`: Tracks the total time the session was paused. Defaults to `0`.
- **Why**: To define the structure of sessions in the database and ensure proper associations with tasks and users.
- **Additional Features**:
  - Added validation for session types (`focus` or `break`) and durations (positive numbers).
  - Ensured `taskId` is required only for focus sessions.

### Sub-todo 4.1.2: Session Validation (utils/validation.js)
- **What we did**: Added validation rules for sessions in `utils/validation.js`:
  - **Session Type**: Ensures `sessionType` is either `focus` or `break`.
  - **Duration**: Ensures `duration` is a positive number.
  - **Task Validation**: Ensures `taskId` exists in the database for focus sessions.
  - **Timestamp Validation**:
    - Ensures `startTime` and `endTime` are valid ISO 8601 dates.
    - Ensures `endTime` is after `startTime`.
- **Why**: To ensure that only valid session data is accepted when creating or updating sessions.

### Sub-todo 4.1.3: Test Session Model
- **What we did**: Created a test script (`testSessionModel.js`) to:
  - Create a sample user and associate tasks with the user.
  - Create a session linked to the task and user.
  - Query sessions by `userId` and populate the `taskId` field with task details.
  - Test validation rules by attempting to create sessions with invalid data.
- **Why**: To verify that the Session model, task and user associations, and validation rules work as expected.
- **Results**:
  - Successfully created valid sessions and linked them to tasks and users.
  - Validation rules correctly prevented invalid sessions from being created.
  - Queried sessions returned the expected results, with task details populated.

---

## **Main Todo 4.2: Session Endpoints Implementation**

### Sub-todo 4.2.1: Start Session Endpoint (POST /api/sessions/start)
- **What we did**: Implemented the `POST /api/sessions/start` endpoint to allow users to start a session.
  - Protected the route with `authMiddleware` to ensure only authenticated users can start sessions.
  - Validated session data, including `taskId`, `sessionType`, `duration`, `startTime`, and `endTime`.
  - Created a session record in the database with the provided details.
  - Returned the session ID to the client for tracking purposes.
- **Why**: To enable users to initiate focus or break sessions and track their progress.

### Sub-todo 4.2.2: Update Session Endpoint (PUT /api/sessions/:id)
- **What we did**: Implemented the `PUT /api/sessions/:id` endpoint to allow users to update session details.
  - Protected the route with `authMiddleware` to ensure only authenticated users can update sessions.
  - Handled pause/resume functionality by updating the `pausedDuration` field.
  - Allowed updating the `actualDuration` field to track time spent during the session.
  - Ensured only the session owner can update the session.
- **Why**: To allow users to manage their sessions dynamically, including pausing, resuming, and tracking actual time spent.

### Sub-todo 4.2.3: Complete Session Endpoint (POST /api/sessions/:id/complete)
- **What we did**: Implemented the `POST /api/sessions/:id/complete` endpoint to mark a session as completed.
  - Protected the route with `authMiddleware` to ensure only authenticated users can complete sessions.
  - Marked the session as completed and calculated the final `actualDuration`.
  - Updated the associated task’s `totalTimeSpent` field for focus sessions.
  - Returned a session summary to the client.
- **Why**: To finalize sessions and update task statistics, providing users with meaningful insights into their productivity.

### Sub-todo 4.2.4: Get Session History (GET /api/sessions)
- **What we did**: Implemented the `GET /api/sessions` endpoint to fetch a user’s session history.
  - Protected the route with `authMiddleware` to ensure only authenticated users can access their session history.
  - Added filtering options for `taskId`, `sessionType`, and date range (`startDate` and `endDate`).
  - Included pagination with `page` and `limit` query parameters for large session histories.
  - Returned aggregated statistics and session details to the client.
- **Why**: To provide users with a detailed history of their sessions, enabling them to review their focus and break patterns.

---

## **Main Todo 4.3: Analytics and Session Enhancements**

### Sub-todo 4.3.1: Task Time Aggregation
- **What we did**: Added a method in `Task.js` to calculate task-specific metrics:
  - **Total Time Spent**: Sum of `actualDuration` for all sessions linked to the task.
  - **Completed vs Incomplete Sessions**: Counted completed sessions and calculated incomplete sessions.
  - **Average Session Duration**: Calculated the average time spent per session.
  - **Efficiency Metrics**: Compared actual time spent to planned time and expressed it as a percentage.
- **Why**: To provide detailed insights into how much time users spend on tasks and how efficiently they work.
- **Additional Features**:
  - Tested the aggregation logic with a script to ensure accurate calculations.

### Sub-todo 4.3.2: User Productivity Statistics
- **What we did**: Added a method in `Session.js` to calculate user productivity metrics:
  - **Daily/Weekly Session Counts**: Counted focus and break sessions.
  - **Total Focus Time**: Calculated the total time spent in focus sessions.
  - **Break-to-Focus Ratio**: Analyzed the ratio of break sessions to focus sessions.
  - **Productivity Trends**: Supported filtering by date range to analyze trends over time.
- **Why**: To help users understand their productivity patterns and improve their focus and break habits.
- **Additional Features**:
  - Tested the productivity metrics with a script to ensure accurate calculations.

### Sub-todo 4.3.3: Session Controller Enhancements
- **What we did**: Enhanced `sessionController.js` to include analytics and session management functions:
  - **Task Analytics**: Added a method to fetch task-specific metrics (e.g., total time spent, session counts, efficiency).
  - **User Productivity Analytics**: Added a method to fetch user productivity statistics (e.g., focus time, break time, trends).
  - **Error Handling**: Included proper error handling for invalid requests and unauthorized access.
  - **Validation and Sanitization**: Ensured input data is validated and sanitized before processing.
- **Why**: To centralize session-related analytics and management logic, making it easier to maintain and extend.
- **Additional Features**:
  - Added routes in `routes/sessions.js` to expose analytics endpoints:
    - **GET /api/sessions/analytics/task/:taskId**: Fetch task-specific analytics.
    - **GET /api/sessions/analytics/user**: Fetch user productivity statistics.

---

## **Main Todo 4.4: Session Routes, Testing, and Documentation**

### Sub-todo 4.4.1: Session Routes Setup (routes/sessions.js)
- **What we did**: Defined all session management routes in `routes/sessions.js`:
  - **POST /api/sessions/start**: Start a new session.
  - **PUT /api/sessions/:id**: Update an existing session (e.g., pause/resume).
  - **POST /api/sessions/:id/complete**: Mark a session as completed.
  - **GET /api/sessions**: Fetch session history with filtering and pagination.
  - **GET /api/sessions/analytics/task/:taskId**: Fetch task-specific analytics.
  - **GET /api/sessions/analytics/user**: Fetch user productivity statistics.
- **Why**: To organize session-related routes and connect them to the corresponding controller functions.
- **Additional Features**:
  - Applied `authMiddleware` to protect all routes.
  - Used `rateLimit` middleware to limit session-related requests (e.g., 10 requests per hour per IP).
  - Connected routes to the appropriate controller functions.

### Sub-todo 4.4.2: Backend Integration Testing
- **What we did**: Performed integration testing to ensure all session-related functionality works as expected:
  - **Complete Task-to-Session Workflow**:
    - Created a task, started a session, updated the session (pause/resume), and completed the session.
    - Verified that the session was correctly linked to the task and user.
    - Ensured that task metrics (e.g., `totalTimeSpent`) were updated after completing the session.
  - **Session Timing Accuracy**:
    - Tested sessions with different `startTime` and `endTime` values.
    - Verified that `actualDuration` was calculated correctly (`actualDuration = endTime - startTime - pausedDuration`).
  - **Pause/Resume Functionality**:
    - Tested the `PUT /api/sessions/:id` endpoint with `action: "pause"` and `action: "resume"`.
    - Verified that `pausedDuration` was updated correctly.
  - **Analytics Calculations**:
    - Tested task analytics (`GET /api/sessions/analytics/task/:taskId`) and user productivity stats (`GET /api/sessions/analytics/user`).
    - Verified that metrics like total focus time, break-to-focus ratio, and efficiency were accurate.
- **Why**: To ensure that all session-related features work seamlessly and provide accurate data.

### Sub-todo 4.4.3: API Documentation
- **What we did**: Created comprehensive API documentation in `api-documentation.md`:
  - Documented all session-related endpoints with request/response examples.
  - Included authentication requirements for each endpoint.
  - Added error response formats for common errors (e.g., `400 Bad Request`, `401 Unauthorized`, `404 Not Found`).
  - Provided detailed examples for each endpoint, including:
    - **POST /api/sessions/start**: Example request body and success/error responses.
    - **PUT /api/sessions/:id**: Example for pause/resume functionality.
    - **POST /api/sessions/:id/complete**: Example for completing a session.
    - **GET /api/sessions**: Example for fetching session history with filtering and pagination.
    - **GET /api/sessions/analytics/task/:taskId**: Example for task-specific analytics.
    - **GET /api/sessions/analytics/user**: Example for user productivity statistics.
  - Created a Postman collection for testing:
    - Added all session-related endpoints to the collection.
    - Included example requests and responses for each endpoint.
    - Exported the collection as a `.json` file for easy sharing and testing.
- **Why**: To provide clear and detailed documentation for developers and testers, ensuring the API is easy to understand and use.

---

## **Main Todo 5.1: React App Initialization**

### Sub-todo 5.1.1: Create React App
- **What we did**: Initialized the React app using Vite.
  - Ran the following command to create the app:
    ```bash
    npm create vite@latest frontend --template react
    cd frontend
    ```
  - Selected the **JavaScript** option during setup.
  - Installed the project dependencies:
    ```bash
    npm install
    ```
- **Why**: To set up a modern, fast, and optimized development environment for the frontend using Vite.

---

### Sub-todo 5.1.2: Install Frontend Dependencies
- **What we did**: Installed the required dependencies for the project.
  - Installed the main dependencies:
    ```bash
    npm install axios react-router-dom daisyui
    ```
    - **`axios`**: For making HTTP requests to the backend.
    - **`react-router-dom`**: For handling routing in the React app.
    - **`daisyui`**: A Tailwind CSS-based UI library for prebuilt components.
  - Installed the development dependencies for Tailwind CSS:
    ```bash
    npm install -D tailwindcss postcss autoprefixer
    ```
    - **`tailwindcss`**: The core Tailwind CSS library.
    - **`postcss`**: A tool for transforming CSS with plugins.
    - **`autoprefixer`**: A PostCSS plugin that adds vendor prefixes for better browser compatibility.
- **Why**: To set up the tools and libraries needed for styling, routing, and API integration.

---

### Sub-todo 5.1.3: Configure Tailwind CSS and DaisyUI
- **What we did**: Configured Tailwind CSS and DaisyUI for styling.
  - Created the `tailwind.config.cjs` file (changed from `.js` to `.cjs` due to Vite's `"type": "module"` setting):
    ```javascript
    module.exports = {
      content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
      theme: {
        extend: {},
      },
      plugins: [require('daisyui')],
    };
    ```
  - Created the `postcss.config.cjs` file (changed from `.js` to `.cjs`):
    ```javascript
    module.exports = {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    };
    ```
  - Added Tailwind CSS imports to `src/index.css`:
    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```
  - Tested the setup by adding a simple DaisyUI button in `App.jsx`:
    ```jsx
    function App() {
      return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <button className="btn btn-primary">Test DaisyUI Button</button>
        </div>
      );
    }

    export default App;
    ```
  - Ran the development server:
    ```bash
    npm run dev
    ```
  - Verified in the browser that:
    - The background was light gray (`bg-gray-100` from Tailwind CSS).
    - A blue button labeled "Test DaisyUI Button" was displayed (`btn btn-primary` from DaisyUI).
- **Why**: To set up Tailwind CSS and DaisyUI for styling and ensure they work seamlessly with Vite.

---

### **Note**
- Both `tailwind.config.js` and `postcss.config.js` were renamed to `.cjs` to resolve the `module is not defined` error caused by Vite's `"type": "module"` setting in `package.json`.

---