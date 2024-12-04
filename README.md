
# Library Management API

This project is a RESTful API designed for managing a library system. The API handles users, books, and borrowing/returning operations while maintaining a simple and robust structure.

---

## **Features**

- User management: create, list, and retrieve users.
- Book management: create, list, and retrieve books.
- Borrowing and returning books with user scores.
- Simple and clean error handling.

---

## **Requirements**

- Node.js (v16 or above)
- MongoDB (running locally or remotely)
- npm (v8 or above)
- TypeScript (v4 or above)

---

## **Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/YavuzYilmazz/library_management_api.git
   cd library-management-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the provided .env.dist file to a new file named .env in the root directory of the project:

    ```bash
    cp .env.dist .env
    ```


4. Start the application:
   ```bash
   npm run build
   npm run dev
   ```

5. The server will run at `http://localhost:3000`.

---

## **Usage**

### **Available Scripts**

- `npm run dev`: Starts the application in development mode.
- `npm run build`: Compiles TypeScript to JavaScript.
- `npm start`: Runs the compiled application.

---

## **API Documentation**

### **Users**

#### **Create User**
- **Endpoint**: `POST /users`
- **Request Body**:
  ```json
  {
    "name": "John Doe"
  }
  ```
- **Response**:
  ```json
  {
    "id": "user_id",
    "name": "John Doe",
    "books": {
      "past": [],
      "present": []
    }
  }
  ```

#### **List Users**
- **Endpoint**: `GET /users`
- **Response**:
  ```json
  [
    {
      "id": "user_id",
      "name": "John Doe"
    }
  ]
  ```

#### **Get User by ID**
- **Endpoint**: `GET /users/:id`
- **Response**:
  ```json
  {
    "id": "user_id",
    "name": "John Doe",
    "books": {
      "past": [
        {
          "name": "Book Title",
          "userScore": 8
        }
      ],
      "present": [
        {
          "name": "Another Book"
        }
      ]
    }
  }
  ```

### **Books**

#### **Create Book**
- **Endpoint**: `POST /books`
- **Request Body**:
  ```json
  {
    "name": "Book Title"
  }
  ```
- **Response**:
  ```json
  {
    "id": "book_id",
    "name": "Book Title",
    "score": -1
  }
  ```

#### **List Books**
- **Endpoint**: `GET /books`
- **Response**:
  ```json
  [
    {
      "id": "book_id",
      "name": "Book Title"
    }
  ]
  ```

#### **Get Book by ID**
- **Endpoint**: `GET /books/:id`
- **Response**:
  ```json
  {
    "id": "book_id",
    "name": "Book Title",
    "score": 5
  }
  ```

---

### **Error Handling**

The API returns consistent error messages with HTTP status codes:
- **404 Not Found**: When a requested resource (user or book) is not found.
- **400 Bad Request**: For validation errors or incorrect operations.
- **500 Internal Server Error**: For unexpected server issues.

Example Error Response:
```json
{
  "message": "User not found"
}
```

---

## **Folder Structure**

```
src/
├── adapters/
│   └── controllers/
├── domain/
│   └── entities/
├── infrastructure/
│   └── database/
├── repositories/
├── use_cases/
├── utils/
└── index.ts
```

- **adapters/controllers**: Handles HTTP requests and delegates work to use cases.
- **domain/entities**: Defines database models for Users and Books.
- **infrastructure/database**: Handles MongoDB connection.
- **repositories**: Provides an abstraction layer over database operations.
- **use_cases**: Business logic for the application.
- **utils**: Helper functions and error handling.

---

## **Contributing**

Contributions are welcome! Please submit a pull request or open an issue for improvements or bug fixes.


