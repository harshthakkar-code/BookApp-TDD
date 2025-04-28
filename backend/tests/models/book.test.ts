import { Book } from '../../src/models/book';

describe('Book Model', () => {
  it('should create a book with valid properties', () => {
    const book = new Book('The Great Gatsby', 'F. Scott Fitzgerald', '9780743273565');
    
    expect(book.title).toBe('The Great Gatsby');
    expect(book.author).toBe('F. Scott Fitzgerald');
    expect(book.isbn).toBe('9780743273565');
  });

  it('should throw an error when title is empty', () => {
    expect(() => {
      new Book('', 'F. Scott Fitzgerald', '9780743273565');
    }).toThrow('Title cannot be empty');
  });

  it('should throw an error when author is empty', () => {
    expect(() => {
      new Book('The Great Gatsby', '', '9780743273565');
    }).toThrow('Author cannot be empty');
  });

  it('should throw an error when ISBN is empty', () => {
    expect(() => {
      new Book('The Great Gatsby', 'F. Scott Fitzgerald', '');
    }).toThrow('ISBN cannot be empty');
  });
}); 