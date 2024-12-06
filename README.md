
# Blog API Backend

A robust backend API designed for managing blogs, categories, comments, and users with authentication and role-based access control.

---

## Features

- **User Authentication**:
  - Register and login with secure validation.
- **Blog Operations**:
  - Create, edit, delete, and view blogs with search capabilities.
- **Category Management**:
  - Add new categories securely.
- **Comment System**:
  - Add, edit, delete, and fetch comments for blogs.
- **Search**:
  - Find blogs by keywords.

---

## Tech Stack

- **Backend**: Node.js with Express.js for server-side logic.
- **Database**: MongoDB for storing data.
- **Authentication**: JWT for user authentication.
- **Middleware**:
  - Custom validation middleware for user data.
  - Authentication middleware to protect routes.

---

## API Endpoints

### User Authentication

- **Register User**  
  `POST /api/users/register`  
  Payload:  
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- **Login User**  
  `POST /api/users/login`  
  Payload:  
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

---

### Blog Management

- **Create Blog**  
  `POST /api/blogs/` (Protected)  
  Payload:  
  ```json
  {
    "title": "Blog Title",
    "content": "Blog Content",
    "tags": ["tag1", "tag2"],
    "category": "Category"
  }
  ```

- **Read Blogs**  
  `GET /api/blogs/`  
  Optional Query Parameters:  
  - `page`: Page number for pagination.
  - `limit`: Number of blogs per page.

- **Get Single Blog**  
  `GET /api/blogs/:id`

- **Edit Blog**  
  `PUT /api/blogs/:id` (Protected)  
  Payload:  
  ```json
  {
    "title": "Updated Title",
    "content": "Updated Content"
  }
  ```

- **Delete Blog**  
  `DELETE /api/blogs/:id` (Protected)

- **Search Blogs**  
  `GET /api/blogs/search?query=keyword`  

---

### Category Management

- **Create Category**  
  `POST /api/categories/` (Protected)  
  Payload:  
  ```json
  {
    "name": "Category Name"
  }
  ```

---

### Comment Management

- **Add Comment**  
  `POST /api/comments/:id` (Protected)  
  Payload:  
  ```json
  {
    "comment": "This is a comment"
  }
  ```

- **Get Comments**  
  `GET /api/comments/:id`

- **Edit Comment**  
  `PUT /api/comments/:id` (Protected)  
  Payload:  
  ```json
  {
    "comment": "Updated comment"
  }
  ```

- **Delete Comment**  
  `DELETE /api/comments/:id` (Protected)

---

## Installation and Setup

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/deveshanurag/Blog.git
   ```

2. **Install Dependencies**  
   ```bash
   npm install
   ```

3. **Configure Environment Variables**  
   Create a `.env` file in the root directory and add the following:  
   ```plaintext
   PORT=5000
   MONGO_URI=<your-mongodb-uri>
   SECRET_KEY=<your-jwt-secret>
   ```

4. **Start the Server**  
   ```bash
   npm start
   ```

---

## Usage Guidelines

- Use the JWT token obtained during login to access protected routes.
- Ensure valid data is sent in the requests; validation is enforced on the server.

---

## Future Enhancements

- Role-based access for category and comment management.
- Additional analytics for user and blog activities.
- Integration with frontend frameworks for a seamless user experience.

---

This API backend is built for scalability and security. Contributions are welcome!
```
