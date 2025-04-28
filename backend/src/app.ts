import express from 'express';
import cors from 'cors';
import { BookService } from './services/bookService';

const app = express();
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

const bookService = new BookService();

// Create a new book
app.post('/books', (req, res) => {
  try {
    const { title, author, isbn } = req.body;
    const book = bookService.addBook(title, author, isbn);
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

// Get all books
app.get('/books', (req, res) => {
  const books = bookService.getAllBooks();
  res.json(books);
});

// Get a book by ISBN
app.get('/books/:isbn', (req, res) => {
  const book = bookService.getBookByIsbn(req.params.isbn);
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }
  res.json(book);
});

// Update a book
app.put('/books/:isbn', (req, res) => {
  const { title, author } = req.body;
  const book = bookService.updateBook(req.params.isbn, title, author);
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }
  res.json(book);
});

// Delete a book
app.delete('/books/:isbn', (req, res) => {
  const deleted = bookService.deleteBook(req.params.isbn);
  if (!deleted) {
    return res.status(404).json({ error: 'Book not found' });
  }
  res.json({ message: 'Book deleted successfully' });
});

export { app }; 