const React = require('react');
const { render, screen, fireEvent, waitFor } = require('@testing-library/react');
const { BrowserRouter } = require('react-router-dom');
const BookForm = require('./BookForm').default;
const api = require('../services/api');

// Mock the API module
jest.mock('../services/api');

describe('BookForm Component', () => {
  const mockBook = {
    title: 'Test Book',
    author: 'Test Author',
    isbn: '1234567890'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders create form when no book is provided', () => {
    render(
      <BrowserRouter>
        <BookForm />
      </BrowserRouter>
    );
    expect(screen.getByText('Add New Book')).toBeInTheDocument();
  });

  it('renders edit form when book is provided', () => {
    render(
      <BrowserRouter>
        <BookForm book={mockBook} />
      </BrowserRouter>
    );
    expect(screen.getByText('Edit Book')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Book')).toBeInTheDocument();
  });

  it('submits new book when form is submitted', async () => {
    (api.createBook).mockResolvedValue(mockBook);
    
    render(
      <BrowserRouter>
        <BookForm />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Test Book' } });
    fireEvent.change(screen.getByLabelText('Author'), { target: { value: 'Test Author' } });
    fireEvent.change(screen.getByLabelText('ISBN'), { target: { value: '1234567890' } });

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(api.createBook).toHaveBeenCalledWith(mockBook);
    });
  });

  it('updates book when edit form is submitted', async () => {
    (api.updateBook).mockResolvedValue(mockBook);
    
    render(
      <BrowserRouter>
        <BookForm book={mockBook} />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Updated Book' } });
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(api.updateBook).toHaveBeenCalledWith('1234567890', {
        ...mockBook,
        title: 'Updated Book'
      });
    });
  });

  it('shows error message when submission fails', async () => {
    (api.createBook).mockRejectedValue(new Error('Failed to create book'));
    
    render(
      <BrowserRouter>
        <BookForm />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Test Book' } });
    fireEvent.change(screen.getByLabelText('Author'), { target: { value: 'Test Author' } });
    fireEvent.change(screen.getByLabelText('ISBN'), { target: { value: '1234567890' } });

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByText('Failed to create book')).toBeInTheDocument();
    });
  });
}); 