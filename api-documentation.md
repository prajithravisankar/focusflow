# FocusFlow API Documentation

## Overview
FocusFlow is a productivity app designed to help users manage tasks and sessions effectively. This document provides detailed information about the API endpoints, request/response formats, authentication, and error handling.

---

## Authentication
All endpoints (except registration and login) require a valid JWT token in the `Authorization` header.

### Register
**POST** `/api/auth/register`
- **Description**: Create a new user account.
- **Request Body**:
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User registered successfully",
    "user": {
      "id": "string",
      "username": "string",
      "email": "string"
    }
  }
  ```

### Login
**POST** `/api/auth/login`
- **Description**: Authenticate a user and return a JWT token.
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  ```json
  {
    "token": "string",
    "user": {
      "id": "string",
      "username": "string",
      "email": "string"
    }
  }
  ```

---

## Tasks
### Create Task
**POST** `/api/tasks`
- **Description**: Create a new task.
- **Request Body**:
  ```json
  {
    "title": "string",
    "description": "string",
    "dueDate": "string"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Task created successfully",
    "task": {
      "id": "string",
      "title": "string",
      "description": "string",
      "dueDate": "string",
      "status": "string"
    }
  }
  ```

### Get Tasks
**GET** `/api/tasks`
- **Description**: Retrieve all tasks for the authenticated user.
- **Response**:
  ```json
  [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "dueDate": "string",
      "status": "string"
    }
  ]
  ```

---

## Sessions
### Start Session
**POST** `/api/sessions/start`
- **Description**: Start a new session for a task.
- **Request Body**:
  ```json
  {
    "taskId": "string"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Session started successfully",
    "session": {
      "id": "string",
      "taskId": "string",
      "startTime": "string"
    }
  }
  ```

### Complete Session
**POST** `/api/sessions/complete`
- **Description**: Mark a session as completed.
- **Request Body**:
  ```json
  {
    "sessionId": "string"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Session completed successfully",
    "session": {
      "id": "string",
      "taskId": "string",
      "startTime": "string",
      "endTime": "string"
    }
  }
  ```

---

## Error Handling
All errors follow this format:
```json
{
  "error": "string",
  "message": "string"
}
```

---

For more details, refer to the `README.md` or contact the developmer: prajithravisankar@gmail.com.