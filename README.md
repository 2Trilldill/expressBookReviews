# 📚 Express Book Review API

An authenticated, RESTful API for an online book review platform, built with **Node.js** and **Express.js**. This backend service allows users to register, log in, and perform full CRUD operations on book reviews. Authentication is handled via **JWT tokens** stored in the session. Routes are protected accordingly to ensure secure access.

---

## 🚀 Features

### ✅ Public (General User) Endpoints
- View all books in the store
- Search books by:
  - ISBN
  - Author
  - Title
- View reviews for a specific book

### 🔐 Authenticated (Registered User) Endpoints
- Register a new user
- Log in and receive a JWT session token
- Add a review to a book
- Modify own review
- Delete own review

---

## 🔧 Technologies Used

- **Node.js** & **Express.js**
- **JWT (jsonwebtoken)** for authentication
- **express-session** for session management
- **Axios** for internal async calls
- **Promises** and **Async/Await** for non-blocking I/O
- **Postman** for testing

---

## 📂 Project Structure

