import request from 'supertest';
import { app } from '../../src/app';

describe('Book API Routes', () => {
  const testBook = {
    title: 'Test Book',
    author: 'Test Author',
    isbn: '1234567890'
  };

  it('should create a new book', async () => {
    const response = await request(app)
      .post('/books')
      .send(testBook);

    expect(response.status).toBe(201);
    expect(response.body.title).toBe(testBook.title);
    expect(response.body.author).toBe(testBook.author);
    expect(response.body.isbn).toBe(testBook.isbn);
  });

  it('should get all books', async () => {
    await request(app)
      .post('/books')
      .send(testBook);

    const response = await request(app)
      .get('/books');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should get a book by ISBN', async () => {
    await request(app)
      .post('/books')
      .send(testBook);

    const response = await request(app)
      .get(`/books/${testBook.isbn}`);

    expect(response.status).toBe(200);
    expect(response.body.isbn).toBe(testBook.isbn);
  });

  it('should update a book', async () => {
    await request(app)
      .post('/books')
      .send(testBook);

    const updatedBook = {
      title: 'Updated Book',
      author: 'Updated Author'
    };

    const response = await request(app)
      .put(`/books/${testBook.isbn}`)
      .send(updatedBook);

    expect(response.status).toBe(200);
    expect(response.body.title).toBe(updatedBook.title);
    expect(response.body.author).toBe(updatedBook.author);
  });

  it('should delete a book', async () => {
    await request(app)
      .post('/books')
      .send(testBook);

    const response = await request(app)
      .delete(`/books/${testBook.isbn}`);

    expect(response.status).toBe(200);

    const getResponse = await request(app)
      .get(`/books/${testBook.isbn}`);
    expect(getResponse.status).toBe(404);
  });

  it('should return 404 for non-existent book', async () => {
    const response = await request(app)
      .get('/books/nonexistent');

    expect(response.status).toBe(404);
  });

  it('should validate required fields when creating a book', async () => {
    const invalidBook = {
      title: '',
      author: '',
      isbn: ''
    };

    const response = await request(app)
      .post('/books')
      .send(invalidBook);

    expect(response.status).toBe(400);
  });
}); 