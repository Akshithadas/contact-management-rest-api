# Contact Management REST API

A clean, lightweight RESTful backend API built with **Node.js** and **Express.js** for managing contact records with local **JSON file persistence**.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FAkshithadas%2Fcontact-management-rest-api)
[![Deploy to Render](https://render.com/images/deploy-to-render.svg)](https://render.com/deploy?repo=https://github.com/Akshithadas/contact-management-rest-api)

This project implements a complete CRUD (Create, Read, Update, Delete) interface with robust request validation, standardized HTTP status codes, structured JSON error handling, and file-based storage.

---

## 🚀 Live Deployment

This REST API is ready for 1-click deployment on free hosting platforms:

### Deploy to Vercel (Recommended - Instant Serverless API)
1. Go to [Vercel.com](https://vercel.com) and sign in with your GitHub account.
2. Click **Add New Project** and select `Akshithadas/contact-management-rest-api`.
3. Click **Deploy**.
4. Vercel will generate your live public URL (e.g. `https://contact-management-rest-api.vercel.app`).
5. Copy this URL and add it to the **About** section of your GitHub repository!

### Deploy to Render (Free Web Service)
1. Go to [Render.com](https://render.com) and sign in with GitHub.
2. Click **New +** -> **Web Service** and select `Akshithadas/contact-management-rest-api`.
3. Click **Deploy Web Service**.
4. Render will generate your live public URL (e.g. `https://contact-management-rest-api.onrender.com`).

---


## 🌟 Key Features

- **Full CRUD Operations**: Complete endpoints for creating, reading, updating, and deleting contact records.
- **JSON File Persistence**: Persistent storage handled seamlessly via `data/contacts.json` without requiring external database configuration.
- **Input & Payload Validation**: Automatic validation for required fields (`name`, `email`, `phone`) and non-empty strings.
- **Standardized HTTP Responses**: Accurate status codes (`200 OK`, `201 Created`, `400 Bad Request`, `404 Not Found`, `500 Internal Server Error`).
- **Clean Architecture**: Well-structured code with detailed inline comments and clear routing.

---

## 🛠️ Tech Stack

- **Node.js**: JavaScript server runtime environment
- **Express.js**: Fast, minimalist web framework for Node.js
- **JSON Storage**: Local file-based data persistence (`data/contacts.json`)
- **Postman**: API development and verification tool

---

## 📁 Project Structure

```text
contact-management-rest-api/
├── data/
│   └── contacts.json    # JSON storage file for persistent records
├── .gitignore           # Git ignore configuration
├── package.json         # Project manifest and scripts
├── server.js            # Express server & API route handlers
└── README.md            # Documentation
```

---

## 💾 Data Storage & Persistence

All contact records are read from and written to `data/contacts.json` in real-time. Any changes made through `POST`, `PUT`, or `DELETE` requests are saved back to the JSON file, ensuring data persists across server restarts without requiring a traditional database system like PostgreSQL or MongoDB.

---

## ⚙️ Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Akshithadas/contact-management-rest-api.git
   cd contact-management-rest-api
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the server**:
   ```bash
   npm start
   ```
   The API server will run at: `http://localhost:3000`

---

## 📡 API Endpoints Reference

Base URL: `http://localhost:3000`

| Method | Endpoint | Description | Success Status | Error Statuses |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/contacts` | Retrieve all contacts | `200 OK` | `500` |
| `GET` | `/api/contacts/:id` | Retrieve single contact by ID | `200 OK` | `404`, `500` |
| `POST` | `/api/contacts` | Create a new contact record | `201 Created` | `400`, `500` |
| `PUT` | `/api/contacts/:id` | Update an existing contact by ID | `200 OK` | `400`, `404`, `500` |
| `DELETE` | `/api/contacts/:id` | Delete a contact record by ID | `200 OK` | `404`, `500` |

---

## 📝 Request & Response Examples

### 1. Get All Contacts
- **Method**: `GET`
- **URL**: `http://localhost:3000/api/contacts`
- **Response** (`200 OK`):
  ```json
  [
    {
      "id": "1",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "9876543210"
    },
    {
      "id": "2",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "phone": "9123456789"
    }
  ]
  ```

---

### 2. Get Single Contact
- **Method**: `GET`
- **URL**: `http://localhost:3000/api/contacts/1`
- **Response** (`200 OK`):
  ```json
  {
    "id": "1",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210"
  }
  ```

---

### 3. Create Contact
- **Method**: `POST`
- **URL**: `http://localhost:3000/api/contacts`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "name": "Alex Mercer",
    "email": "alex@example.com",
    "phone": "9876543210"
  }
  ```
- **Response** (`201 Created`):
  ```json
  {
    "id": "1724073600000",
    "name": "Alex Mercer",
    "email": "alex@example.com",
    "phone": "9876543210"
  }
  ```

---

### 4. Update Contact
- **Method**: `PUT`
- **URL**: `http://localhost:3000/api/contacts/1`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "name": "Johnathan Doe",
    "email": "johnathan@example.com",
    "phone": "9876543210"
  }
  ```
- **Response** (`200 OK`):
  ```json
  {
    "id": "1",
    "name": "Johnathan Doe",
    "email": "johnathan@example.com",
    "phone": "9876543210"
  }
  ```

---

### 5. Delete Contact
- **Method**: `DELETE`
- **URL**: `http://localhost:3000/api/contacts/1`
- **Response** (`200 OK`):
  ```json
  {
    "message": "Contact deleted successfully"
  }
  ```

---

### 🔴 Error Response Format

- **Resource Not Found** (`404 Not Found`):
  ```json
  {
    "error": "Contact not found"
  }
  ```

- **Validation Failed** (`400 Bad Request`):
  ```json
  {
    "error": "Name, email, and phone are required fields"
  }
  ```

---

## 🧪 Testing with Postman

1. Launch **Postman**.
2. Create a new collection named `Contact Management REST API`.
3. Set the target HTTP method (`GET`, `POST`, `PUT`, `DELETE`).
4. Enter the URL (e.g., `http://localhost:3000/api/contacts`).
5. For `POST` and `PUT` requests:
   - Select the **Body** tab -> **raw** -> **JSON**.
   - Paste the JSON payload into the editor.
6. Click **Send** and inspect the returned HTTP status code and response body.
