# Frontend - Book Management System

The frontend of the Book Management System is built with React and provides a user-friendly interface for managing books.

## Technologies Used

- React
- React Router
- Axios
- Material-UI (or your preferred UI library)
- Redux (for state management)

## Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── services/      # API service functions
│   ├── store/         # Redux store configuration
│   ├── utils/         # Utility functions
│   ├── App.js         # Main application component
│   └── index.js       # Application entry point
├── public/            # Static assets
└── package.json       # Project dependencies
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory with the following variables:
```
REACT_APP_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## Features

- Book listing and search
- Book details view
- Add/Edit/Delete books
- User authentication
- Responsive design

## API Integration

The frontend communicates with the backend API through the following endpoints:

- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get a specific book
- `POST /api/books` - Create a new book
- `PUT /api/books/:id` - Update a book
- `DELETE /api/books/:id` - Delete a book

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

This project is licensed under the MIT License.
