# Local API Documentation

## Overview

This API provides functionalities for user authentication, managing notifications, and task handling within a project management system. It is designed to facilitate operations related to users, notifications, and tasks.

## Base URL

All API requests should be made to the base URL:

```
http://localhost:8081/api
```

## Authentication

### **Login**

- **Endpoint**: `/auth/login`
- **Method**: `POST`
- **Description**: Authenticates a user with a username and password.
- **Body**:
  ```json
  {
    "Username": "example",
    "Password": "password123"
  }
  ```
- **Responses**:
  - `200 OK`: Successfully authenticated.
    ```json
    {
      "message": "User authenticated successfully.",
      "user": {
        "Id": 1,
        "Username": "example",
        "FirstName": "John",
        "LastName": "Doe",
        "DateOfBirth": "1990-01-01",
        "Joined_In": "2022-01-01",
        "Email": "example@email.com",
        "ContactNumber": "1234567890",
        "Role": "User",
        "Availability": true
      }
    }
    ```
  - `401 Unauthorized`: User not found or incorrect credentials.

### **Create User Account**

- **Endpoint**: `/auth/createuser`
- **Method**: `POST`
- **Description**: Creates a new user account.
- **Body**:
  ```json
  {
    "Username": "newuser",
    "Password": "newpassword123",
    "FirstName": "Jane",
    "LastName": "Doe",
    "DateOfBirth": "1995-05-05",
    "Email": "jane.doe@email.com",
    "Number": "9876543210",
    "Role": "Admin"
  }
  ```
- **Responses**:
  - `200 OK`: User added successfully.
    ```json
    {
      "message": "User added successfully"
    }
    ```
  - `500 Internal Server Error`: Error in database operations.

## Tasks

### **Create Task**

- **Endpoint**: `/task/CreateTask`
- **Method**: `POST`
- **Description**: Creates a new task with the specified details.
- **Body**:
  ```json
  {
    "pid": 101,
    "description": "Complete the project documentation.",
    "deadline": "2023-12-31",
    "uid": 1,
    "priority": "High",
    "tstatus": "Active"
  }
  ```
- **Responses**:
  - `201 Created`: Task created successfully.
  - `400 Bad Request`: Missing required fields or validation failure.

### **Get All Tasks**

- **Endpoint**: `/task/GetAllTask`
- **Method**: `GET`
- **Description**: Retrieves all tasks.
- **Responses**:
  - `200 OK`: Successfully retrieved all tasks.

### **Update Task**

- **Endpoint**: `/task/UpdateTask/:taskid`
- **Method**: `PATCH`
- **Description**: Updates the specified task.
- **Parameters**:
  - `taskid`: The ID of the task to update.
- **Body**:
  ```json
  {
    "description": "Updated task description."
  }
  ```
- **Responses**:
  - `200 OK`: Task updated successfully.
  - `404 Not Found`: Task not found.

### **Delete Task**

- **Endpoint**: `/task/DeleteTask/:taskid`
- **Method**: `DELETE`
- **Description**: Deletes a task by its ID.
- **Parameters**:
  - `taskid`: The ID of the task to delete.
- **Responses**:
  - `204 No Content`: Task deleted successfully.
  - `404 Not Found`: Task not found.

## Notifications

### **Create Notification**

- **Endpoint**: `/notification/addnoti`
- **Method**: `POST`
- **Description**: Adds a new notification associated with a task.
- **Body**:
  ```json
  {
    "TaskID": 123,
    "Description": "Reminder to update status"
  }
  ```
- **Responses**:
  - `201 Created`: Returns the created notification.
  - `400 Bad Request`: Missing required fields.
  - `500 Internal Server Error`: Server error during creation.

### **Delete Notification**

- **Endpoint**: `/notification/deletenoti/:notificationId`
- **Method**: `DELETE`
- **Description**: Deletes a notification by its ID.
- **Parameters**:
  - `notificationId`: The ID of the notification to delete.
- **Responses**:
  - `200 OK`: Notification deleted successfully.
  - `400 Bad Request`: Notification ID is required.
  - `500 Internal Server Error`: Error during deletion.

### **Update Notification**

- **Endpoint**: `/notification/editnoti/:notificationId`
- **Method**: `PATCH`
- **Description**: Updates an existing notification.
- **Body**:
  ```json
  {
    "Description": "Updated description"
  }
  ```
- **Parameters**:
  - `notificationId`: The ID of the notification to update.
- **Responses**:
  - `200 OK`: Notification updated successfully.
  - `400 Bad Request`: Notification ID or update fields are required.
  - `500 Internal Server Error`: Error during update.

### **Get Notifications by User ID**

- **Endpoint**: `/notification/getnoti/user/:userId`
- **Method**: `GET`
- **Description**: Retrieves all notifications for a specific user by their user ID.
- **Parameters**:
  - `userId`: The user ID to retrieve notifications for.
- **Responses**:
  - `200 OK`: Successfully retrieved notifications.
  - `500 Internal Server Error`: Error retrieving notifications.
