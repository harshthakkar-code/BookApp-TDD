const axios = require('axios');
const { getAllBooks, getBookByIsbn, createBook, updateBook, deleteBook } = require('./api');

jest.mock('axios');
const mockedAxios = axios;

describe('API Service', () => {
  const mockBook = {
    title: 'Test Book',
    author: 'Test Author',
    isbn: '1234567890'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllBooks', () => {
    it('should fetch all books', async () => {
      mockedAxios.get.mockResolvedValue({ data: [mockBook] });

      const result = await getAllBooks();

      expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3000/books');
      expect(result).toEqual([mockBook]);
    });

    it('should handle errors', async () => {
      mockedAxios.get.mockRejectedValue(new Error('Network error'));

      await expect(getAllBooks()).rejects.toThrow('Network error');
    });
  });

  describe('getBookByIsbn', () => {
    it('should fetch a book by ISBN', async () => {
      mockedAxios.get.mockResolvedValue({ data: mockBook });

      const result = await getBookByIsbn('1234567890');

      expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3000/books/1234567890');
      expect(result).toEqual(mockBook);
    });

    it('should handle errors', async () => {
      mockedAxios.get.mockRejectedValue(new Error('Network error'));

      await expect(getBookByIsbn('1234567890')).rejects.toThrow('Network error');
    });
  });

  describe('createBook', () => {
    it('should create a new book', async () => {
      mockedAxios.post.mockResolvedValue({ data: mockBook });

      const result = await createBook({
        title: 'Test Book',
        author: 'Test Author'
      });

      expect(mockedAxios.post).toHaveBeenCalledWith(
        'http://localhost:3000/books',
        {
          title: 'Test Book',
          author: 'Test Author'
        }
      );
      expect(result).toEqual(mockBook);
    });

    it('should handle errors', async () => {
      mockedAxios.post.mockRejectedValue(new Error('Network error'));

      await expect(createBook({
        title: 'Test Book',
        author: 'Test Author'
      })).rejects.toThrow('Network error');
    });
  });

  describe('updateBook', () => {
    it('should update a book', async () => {
      mockedAxios.put.mockResolvedValue({ data: mockBook });

      const result = await updateBook('1234567890', {
        title: 'Updated Title'
      });

      expect(mockedAxios.put).toHaveBeenCalledWith(
        'http://localhost:3000/books/1234567890',
        {
          title: 'Updated Title'
        }
      );
      expect(result).toEqual(mockBook);
    });

    it('should handle errors', async () => {
      mockedAxios.put.mockRejectedValue(new Error('Network error'));

      await expect(updateBook('1234567890', {
        title: 'Updated Title'
      })).rejects.toThrow('Network error');
    });
  });

  describe('deleteBook', () => {
    it('should delete a book', async () => {
      mockedAxios.delete.mockResolvedValue({});

      await deleteBook('1234567890');

      expect(mockedAxios.delete).toHaveBeenCalledWith(
        'http://localhost:3000/books/1234567890'
      );
    });

    it('should handle errors', async () => {
      mockedAxios.delete.mockRejectedValue(new Error('Network error'));

      await expect(deleteBook('1234567890')).rejects.toThrow('Network error');
    });
  });
}); 