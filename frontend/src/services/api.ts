import axios from 'axios';
import { Book } from '../types/book';

const API_URL = 'http://localhost:3000';

export const getAllBooks = async (): Promise<Book[]> => {
  const response = await axios.get(`${API_URL}/books`);
  return response.data;
};

export const getBookByIsbn = async (isbn: string): Promise<Book> => {
  const response = await axios.get(`${API_URL}/books/${isbn}`);
  return response.data;
};

export const createBook = async (book: Omit<Book, 'isbn'>): Promise<Book> => {
  const response = await axios.post(`${API_URL}/books`, book);
  return response.data;
};

export const updateBook = async (isbn: string, book: Partial<Book>): Promise<Book> => {
  const response = await axios.put(`${API_URL}/books/${isbn}`, book);
  return response.data;
};

export const deleteBook = async (isbn: string): Promise<void> => {
  await axios.delete(`${API_URL}/books/${isbn}`);
}; 