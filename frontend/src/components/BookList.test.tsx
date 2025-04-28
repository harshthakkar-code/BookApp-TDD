const React = require('react');
const { render, screen, fireEvent, waitFor } = require('@testing-library/react');
const { BrowserRouter } = require('react-router-dom');
const BookList = require('./BookList').default;
const api = require('../services/api');

// Mock the API module
jest.mock('../services/api');

describe('BookList Component', () => {
  const mockBooks = [
    { title: 'Book 1', author: 'Author 1', isbn: '1234567890' },
    { title: 'Book 2', author: 'Author 2', isbn: '0987654321' }
  ];

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    (api.getAllBooks).mockImplementation(() => new Promise(() => {}));
    render(
      <BrowserRouter>
        <BookList />
      </BrowserRouter>
    );
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders error state when API call fails', async () => {
    (api.getAllBooks).mockRejectedValue(new Error('Failed to fetch books'));
    render(
      <BrowserRouter>
        <BookList />
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('Failed to fetch books')).toBeInTheDocument();
    });
  });

  it('renders list of books when API call succeeds', async () => {
    (api.getAllBooks).mockResolvedValue(mockBooks);
    render(
      <BrowserRouter>
        <BookList />
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('Book 1')).toBeInTheDocument();
      expect(screen.getByText('Book 2')).toBeInTheDocument();
    });
  });

  it('deletes a book when delete button is clicked', async () => {
    (api.getAllBooks).mockResolvedValue(mockBooks);
    (api.deleteBook).mockResolvedValue(undefined);
    
    render(
      <BrowserRouter>
        <BookList />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Book 1')).toBeInTheDocument();
    });

    const deleteButton = screen.getByText('Delete').closest('button');
    if (deleteButton) {
      fireEvent.click(deleteButton);
    }

    await waitFor(() => {
      expect(api.deleteBook).toHaveBeenCalledWith('1234567890');
    });
  });

  it('navigates to edit page when edit button is clicked', async () => {
    (api.getAllBooks).mockResolvedValue(mockBooks);
    
    render(
      <BrowserRouter>
        <BookList />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Book 1')).toBeInTheDocument();
    });

    const editButton = screen.getByText('Edit').closest('a');
    if (editButton) {
      expect(editButton.getAttribute('href')).toBe('/books/1234567890/edit');
    }
  });
}); 