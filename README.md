# JWT Role-Based Authentication API

## Description

This project is a backend authentication API built using Node.js and Express.js.
It implements secure user authentication using JSON Web Tokens (JWT) and includes role-based authorization for different types of users such as Admin and Student.

The API allows users to register, log in, and access protected routes based on their roles. Middleware is used to verify tokens and restrict access to specific routes.

---

## Features

* User signup and login functionality
* Secure password hashing using bcrypt
* JWT-based authentication
* Role-based authorization (Admin and Student)
* Middleware for protected routes
* Environment variable configuration using dotenv

---

## Technologies Used

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token (JWT)
* bcrypt
* dotenv

---

## Project Structure

```
AuthApp/
│
├── controllers/
│   └── authController.js
│
├── middleware/
│   └── auth.js
│
├── models/
│   └── user.model.js
│
├── routes/
│   └── userRoutes.js
│
├── .gitignore
├── index.js
├── package.json
```

---

## Installation

Clone the repository

```
git clone https://github.com/mohammed4721/jwt-auth-api.git
```

Navigate into the project directory

```
cd jwt-auth-api
```

Install dependencies

```
npm install
```

---

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```
PORT=5000
JWTSECRET=your_secret_key
MONGODB_URL=your_mongodb_connection_string
```

---

## Running the Server

Start the server using:

```
npm start
```

or

```
node index.js
```

The server will run on:

```
http://localhost:5000
```

---

## API Endpoints

### Signup

```
POST /signup
```

### Login

```
POST /login
```

### Protected Routes

Student route:

```
GET /student
```

Admin route:

```
GET /admin
```

These routes require a valid JWT token in the request header.

Example header:

```
Authorization: Bearer <token>
```

---

## Author

Mohammed Khaja Mohinuddin
