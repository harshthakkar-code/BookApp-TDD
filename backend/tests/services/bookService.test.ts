import { BookService } from '../../src/services/bookService';
import { Book } from '../../src/models/book';

describe('BookService', () => {
  let bookService: BookService;

  beforeEach(() => {
    bookService = new BookService();
  });

  it('should add a new book', () => {
    const book = bookService.addBook('The Great Gatsby', 'F. Scott Fitzgerald', '9780743273565');
    expect(book).toBeInstanceOf(Book);
    expect(book.title).toBe('The Great Gatsby');
  });

  it('should get all books', () => {
    bookService.addBook('Book 1', 'Author 1', '1234567890');
    bookService.addBook('Book 2', 'Author 2', '0987654321');
    
    const books = bookService.getAllBooks();
    expect(books.length).toBe(2);
  });

  it('should get a book by ISBN', () => {
    const isbn = '9780743273565';
    bookService.addBook('The Great Gatsby', 'F. Scott Fitzgerald', isbn);
    
    const book = bookService.getBookByIsbn(isbn);
    expect(book).toBeDefined();
    expect(book?.isbn).toBe(isbn);
  });

  it('should update a book', () => {
    const isbn = '9780743273565';
    bookService.addBook('The Great Gatsby', 'F. Scott Fitzgerald', isbn);
    
    const updatedBook = bookService.updateBook(isbn, 'Updated Title', 'Updated Author');
    expect(updatedBook).toBeDefined();
    expect(updatedBook?.title).toBe('Updated Title');
    expect(updatedBook?.author).toBe('Updated Author');
  });

  it('should delete a book', () => {
    const isbn = '9780743273565';
    bookService.addBook('The Great Gatsby', 'F. Scott Fitzgerald', isbn);
    
    bookService.deleteBook(isbn);
    const book = bookService.getBookByIsbn(isbn);
    expect(book).toBeUndefined();
  });
}); 