import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SignupPage from '../pages/SignupPage';
import '@testing-library/jest-dom'

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('SignupPage', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test('renders the signup form', () => {
    render(
      <Router>
        <SignupPage />
      </Router>
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/create your password/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /sign up/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });

  test('shows validation errors when form is submitted with empty fields', async () => {
    render(
      <Router>
        <SignupPage />
      </Router>
    );

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));  // More specific selector

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email')).toBeInTheDocument();
    });
  });

  test('validates email and password correctly', async () => {
    render(
      <Router>
        <SignupPage />
      </Router>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/create your password/i);

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(passwordInput, { target: { value: 'short' } });

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email')).toBeInTheDocument();
    });

    fireEvent.change(emailInput, { target: { value: 'valid@email.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Valid123' } });

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(screen.queryByText('Please enter a valid email')).not.toBeInTheDocument();
    });
  });

  test('navigates to success page on valid submission', async () => {
    render(
      <Router>
        <SignupPage />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'valid@email.com' } });
    fireEvent.change(screen.getByLabelText(/create your password/i), { target: { value: 'Valid123' } });

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/success');
    });
  });
});
