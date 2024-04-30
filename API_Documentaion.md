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
  - `500 Internal Server Error`: Error in database operations.

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

## Task Controller API Documentation

### Create a New Task

- **Endpoint:** `POST /task/CreateTask`
- **Description:** Creates a new task with the provided details.
- **Request Body:**
  ```json
  {
    "pid": "Project ID",
    "title": "Task Title",
    "description": "Task Description",
    "deadline": "Deadline Date",
    "uid": "User ID",
    "priority": "Task Priority",
    "tstatus": "Task Status"
  }
  ```
- **Responses:**
  - `201 Created`: Returns the newly created task.
  - `400 Bad Request`: Error message if there is a problem with the request data.

### Retrieve All Tasks

- **Endpoint:** `GET /task/GetAllTask`
- **Description:** Retrieves a list of all tasks in the system.
- **Responses:**
  - `200 OK`: An array of tasks.
  - `500 Internal Server Error`: Error message in case of a server error.

### Update a Task

- **Endpoint:** `PATCH /task/UpdateTask/:taskid`
- **Description:** Updates the specified task with the provided data.
- **Parameters:**
  - `taskid`: The ID of the task to update.
- **Request Body:**
  ```json
  {
    "title": "Updated Title",
    "description": "Updated Description",
    ... // Other task properties as needed
  }
  ```
- **Responses:**
  - `200 OK`: Returns the updated task details.
  - `404 Not Found`: If no task with the specified ID exists.
  - `500 Internal Server Error`: Error message in case of a server error.

### Delete a Task

- **Endpoint:** `DELETE /task/DeleteTask/:taskid`
- **Description:** Deletes the task specified by the ID.
- **Parameters:**
  - `taskid`: The ID of the task to be deleted.
- **Responses:**
  - `204 No Content`: Message indicating successful deletion.
  - `404 Not Found`: If no task with the specified ID exists.
  - `500 Internal Server Error`: Error message in case of a server error.

### Retrieve Tasks Within a Date Range for a User

- **Endpoint:** `GET /task/getTasksForSpecifiedWindow`
- **Description:** Retrieves tasks for a user within the specified start and end dates.
- **Headers:**
  - `user-id`: User ID whose tasks are to be fetched.
- **Query Parameters:**
  - `startDate`: Start date of the range.
  - `endDate`: End date of the range.
- **Responses:**
  - `200 OK`: A list of tasks organized by date.
  - `500 Internal Server Error`: Error message in case of a server error.

### Retrieve Tasks for a User Sorted by Deadline

- **Endpoint:** `GET /task/getTaskByUID/:userId`
- **Description:** Retrieves all tasks for a specific user, sorted by their deadlines.
- **Parameters:**
  - `userId`: User ID for which tasks are retrieved.
- **Responses:**
  - `200 OK`: An array of tasks.
  - `400 Bad Request`: Error message if the user ID is invalid.
  - `500 Internal Server Error`: Error message in case of a server error.

### Retrieve Task by Task ID

- **Endpoint:** `GET /task/getTaskByTID/:taskId`
- **Description:** Retrieves the details of a task specified by its ID.
- **Parameters:**
  - `taskId`: The ID of the task to retrieve.
- **Responses:**
  - `200 OK`: Returns the task details.
  - `404 Not Found`: If no task with the specified ID exists.
  - `400 Bad Request`: Error message if the task ID is invalid.
  - `500 Internal Server Error`: Error message in case of a server error.

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
