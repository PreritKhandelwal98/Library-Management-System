# Library Management System API

A RESTful API for managing a library system built with **Node.js**, **Express.js**, **TypeScript**, **MongoDB**, and **JWT** authentication.

## Features

- **Books Management**: Add, update, delete, and fetch books from the library.
- **Search Functionality**: Search books by title and author.
- **Authentication**: Basic JWT authentication for secure access to certain routes.

## Technologies Used

- **Node.js**: JavaScript runtime for building the backend.
- **Express.js**: Web framework for creating the REST API.
- **TypeScript**: Strongly typed JavaScript for type safety.
- **MongoDB**: NoSQL database to store the books and users.
- **Mongoose**: MongoDB object modeling for Node.js.
- **JWT (JSON Web Tokens)**: For secure authentication and route protection.
- **bcrypt.js**: For password hashing.

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (v12+)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally or using MongoDB Atlas)

## Project Setup

### 1. Clone the repository

```bash
git clone https://github.com/PreritKhandelwal98/Library-Management-System
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory and add the following:

```plaintext
MONGO_URI=mongodb://localhost:27017/library
JWT_SECRET=your_jwt_secret
PORT=5000
```

- Replace `MONGO_URI` with your local or cloud MongoDB URI.
- Set `JWT_SECRET` to any secret string for JWT authentication.

### 4. Start the application

To run the project in development mode:

```bash
npm run dev
```

To build and run the production server:

```bash
npm run build
npm start
```

The server will run on `http://localhost:6000`.

## API Endpoints

### Authentication Routes

#### 1. Register a new user

- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Body**: 

  ```json
  {
    "username": "your_username",
    "password": "your_password"
  }
  ```

- **Response**: `201 Created` on success

#### 2. Login

- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Body**:

  ```json
  {
    "username": "your_username",
    "password": "your_password"
  }
  ```

- **Response**: `200 OK` with JWT token on success

### Book Routes

#### 1. Add a book (JWT required)

- **URL**: `/api/books`
- **Method**: `POST`
- **Headers**: 
  - `Authorization: Bearer <token>`
- **Body**:

  ```json
  {
    "title": "Book Title",
    "author": "Author Name",
    "description": "Description of the book",
    "publishedYear": 2023
  }
  ```

- **Response**: `201 Created` on success

#### 2. Get all books

- **URL**: `/api/books`
- **Method**: `GET`
- **Response**: `200 OK` with a list of all books

#### 3. Get a single book by ID

- **URL**: `/api/books/:id`
- **Method**: `GET`
- **Response**: `200 OK` with the book details on success

#### 4. Update a book (JWT required)

- **URL**: `/api/books/:id`
- **Method**: `PUT`
- **Headers**: 
  - `Authorization: Bearer <token>`
- **Body** (you can send only the fields you want to update):

  ```json
  {
    "title": "Updated Title",
    "author": "Updated Author"
  }
  ```

- **Response**: `200 OK` with the updated book details on success

#### 5. Delete a book (JWT required)

- **URL**: `/api/books/:id`
- **Method**: `DELETE`
- **Headers**: 
  - `Authorization: Bearer <token>`
- **Response**: `200 OK` with a success message

#### 6. Search books by title or author

- **URL**: `/api/books/search`
- **Method**: `GET`
- **Query Params**:
  - `title`: Search by book title (optional)
  - `author`: Search by book author (optional)

- **Response**: `200 OK` with a list of matching books

## Example Usage

### Register a User

```bash
curl -X POST http://localhost:6000/api/auth/register -H "Content-Type: application/json" -d '{
  "username": "johndoe",
  "password": "password123"
}'
```

### Login and Get JWT Token

```bash
curl -X POST http://localhost:6000/api/auth/login -H "Content-Type: application/json" -d '{
  "username": "johndoe",
  "password": "password123"
}'
```

### Add a Book (JWT required)

```bash
curl -X POST http://localhost:6000/api/books -H "Authorization: Bearer <your_jwt_token>" -H "Content-Type: application/json" -d '{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "description": "A novel set in the Jazz Age",
  "publishedYear": 1925
}'
```

### Search for Books

```bash
curl -X GET "http://localhost:6000/api/books/search?title=gatsby"
```

## Security

- **JWT Authentication**: Secure access to protected routes (add, update, delete books) with JSON Web Tokens.
- **Password Hashing**: User passwords are hashed using `bcrypt` before storing them in the database.
