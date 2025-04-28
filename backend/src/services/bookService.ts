import { Book } from '../models/book';

export class BookService {
  private books: Map<string, Book> = new Map();

  addBook(title: string, author: string, isbn: string): Book {
    const book = new Book(title, author, isbn);
    this.books.set(isbn, book);
    return book;
  }

  getAllBooks(): Book[] {
    return Array.from(this.books.values());
  }

  getBookByIsbn(isbn: string): Book | undefined {
    return this.books.get(isbn);
  }

  updateBook(isbn: string, title: string, author: string): Book | undefined {
    const existingBook = this.books.get(isbn);
    if (!existingBook) {
      return undefined;
    }

    const updatedBook = new Book(title, author, isbn);
    this.books.set(isbn, updatedBook);
    return updatedBook;
  }

  deleteBook(isbn: string): boolean {
    return this.books.delete(isbn);
  }
} 