# Book Management System - Backend

This is the backend service for the Book Management System, built with Node.js, Express, and TypeScript.

## Features

- RESTful API for managing books
- In-memory storage (can be extended to use a database)
- TypeScript for type safety
- Jest for testing
- Express.js for routing

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/books` | POST | Add a new book |
| `/books` | GET | Retrieve all books |
| `/books/:isbn` | GET | Retrieve a specific book by ISBN |
| `/books/:isbn` | PUT | Update an existing book |
| `/books/:isbn` | DELETE | Delete a book by ISBN |

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
2. Navigate to the backend directory:
   ```bash
   cd book-management-system/backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm run build
npm start
```

### Running Tests

```bash
npm test
```

To run tests in watch mode:
```bash
npm run test:watch
```

## Project Structure

```
backend/
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   │   └── bookService.ts
│   ├── models/
│   │   └── book.ts
│   ├── app.ts
│   └── server.ts
├── tests/
│   ├── models/
│   │   └── book.test.ts
│   ├── services/
│   │   └── bookService.test.ts
│   └── routes/
│       └── bookRoutes.test.ts
├── package.json
└── tsconfig.json
```

## Design Decisions

1. **TypeScript**: Used for better type safety and developer experience
2. **In-Memory Storage**: Used Map for simplicity, can be replaced with a database
3. **TDD Approach**: All features are developed using Test-Driven Development
4. **Express.js**: Lightweight and flexible web framework
5. **Jest**: Popular testing framework with good TypeScript support

## Error Handling

- 400 Bad Request: Invalid input data
- 404 Not Found: Book not found
- 200 OK: Successful operation
- 201 Created: Book created successfully 