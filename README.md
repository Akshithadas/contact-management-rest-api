# Contact Management REST API

A clean, lightweight RESTful API built with **Node.js** and **Express.js** for managing contact records with local **JSON file persistence**.

Developed as an internship project demonstrating core backend architecture concepts, RESTful routing, HTTP status codes, payload validation, and file-based data persistence without external databases.

---

## 🚀 Technologies Used

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web framework for Node.js
- **JSON File Storage** - Lightweight persistent storage (`data/contacts.json`)
- **Postman** - API testing and verification

---

## 📁 Project Structure

```text
contact-management-rest-api/
├── package.json
├── server.js
├── data/
│   └── contacts.json
└── README.md
```

---

## 🛠️ Installation Steps

1. **Clone or navigate to the repository directory**:
   ```bash
   cd contact-management-rest-api
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

---

## ▶️ Running the Server

Start the API server using npm:

```bash
npm start
```

The server will start listening at:
`http://localhost:3000`

---

## 📡 API Endpoints

Base URL: `http://localhost:3000`

| Method | Endpoint | Description | Status Code (Success) | Error Codes |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/api/contacts` | Retrieve all contacts | `200 OK` | `500` |
| **GET** | `/api/contacts/:id` | Retrieve a single contact by ID | `200 OK` | `404`, `500` |
| **POST** | `/api/contacts` | Create a new contact | `201 Created` | `400`, `500` |
| **PUT** | `/api/contacts/:id` | Update an existing contact by ID | `200 OK` | `400`, `404`, `500` |
| **DELETE**| `/api/contacts/:id` | Delete a contact by ID | `200 OK` | `404`, `500` |

---

## 📝 Example Requests & Responses

### 1. GET All Contacts
- **URL**: `http://localhost:3000/api/contacts`
- **Method**: `GET`
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

### 2. GET One Contact
- **URL**: `http://localhost:3000/api/contacts/1`
- **Method**: `GET`
- **Response** (`200 OK`):
  ```json
  {
    "id": "1",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210"
  }
  ```
- **Error Response** (`404 Not Found`):
  ```json
  {
    "error": "Contact not found"
  }
  ```

---

### 3. POST Create Contact
- **URL**: `http://localhost:3000/api/contacts`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "phone": "9988776655"
  }
  ```
- **Response** (`201 Created`):
  ```json
  {
    "id": "1724073600000",
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "phone": "9988776655"
  }
  ```
- **Validation Error Response** (`400 Bad Request`):
  ```json
  {
    "error": "Name, email, and phone are required fields"
  }
  ```

---

### 4. PUT Update Contact
- **URL**: `http://localhost:3000/api/contacts/1`
- **Method**: `PUT`
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

### 5. DELETE Contact
- **URL**: `http://localhost:3000/api/contacts/1`
- **Method**: `DELETE`
- **Response** (`200 OK`):
  ```json
  {
    "message": "Contact deleted successfully"
  }
  ```

---

## 🧪 Testing with Postman

1. Open **Postman**.
2. Set up a request with the target HTTP Method (`GET`, `POST`, `PUT`, `DELETE`).
3. Enter the request URL (e.g., `http://localhost:3000/api/contacts`).
4. For `POST` and `PUT` requests:
   - Click on the **Body** tab.
   - Select **raw**.
   - Set format dropdown to **JSON**.
   - Paste the JSON payload into the editor.
5. Click **Send** and inspect the returned status code and JSON response body.
