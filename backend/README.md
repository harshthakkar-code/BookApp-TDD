# Backend - Book Management System

The backend of the Book Management System is built with Node.js and Express, providing a RESTful API for book management.

## Technologies Used

- Node.js
- Express.js
- MongoDB (or your preferred database)
- Mongoose (for MongoDB)
- JWT for authentication
- Express Validator

## Project Structure

```
backend/
├── src/
│   ├── controllers/   # Request handlers
│   ├── models/        # Database models
│   ├── routes/        # API routes
│   ├── middleware/    # Custom middleware
│   ├── config/        # Configuration files
│   ├── utils/         # Utility functions
│   └── app.js         # Main application file
├── tests/             # Test files
└── package.json       # Project dependencies
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (or your preferred database)

### Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/book-management
JWT_SECRET=your-secret-key
```

4. Start the development server:
```bash
npm start
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Books

- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get a specific book
- `POST /api/books` - Create a new book
- `PUT /api/books/:id` - Update a book
- `DELETE /api/books/:id` - Delete a book

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

## Database Schema

### Book
```javascript
{
  title: String,
  author: String,
  description: String,
  publishedYear: Number,
  isbn: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Testing

Run the test suite:
```bash
npm test
```

## Security

- JWT-based authentication
- Password hashing
- Input validation
- CORS configuration
- Rate limiting

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

This project is licensed under the MIT License. 