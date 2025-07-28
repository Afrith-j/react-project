
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import Login from '../Login';
import config from '../config';

afterEach(cleanup);

describe('Login Component - Enhanced Tests', () => {
  test('renders Login heading and form', () => {
    render(<Login />);
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /signin/i })).toBeInTheDocument();
  });

  test('email and password should be initially empty', () => {
    render(<Login />);
    expect(screen.getByPlaceholderText('Email')).toHaveValue('');
    expect(screen.getByPlaceholderText('Password')).toHaveValue('');
  });

  test('shows error for invalid email length', async () => {
    render(<Login />);
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'a@b' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: config.credentials.password },
    });
    fireEvent.click(screen.getByRole('button', { name: /signin/i }));

    expect(await screen.findByText(config.messages.emailLength)).toBeInTheDocument();
  });

  test('shows error for invalid password length', async () => {
    render(<Login />);
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: config.credentials.email },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'abc' },
    });
    fireEvent.click(screen.getByRole('button', { name: /signin/i }));

    expect(await screen.findByText(config.messages.passwordLength)).toBeInTheDocument();
  });

  test('shows error for weak password (missing uppercase, number, special char)', async () => {
    render(<Login />);
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: config.credentials.email },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password' }, // weak
    });
    fireEvent.click(screen.getByRole('button', { name: /signin/i }));

    expect(await screen.findByText(config.messages.passwordStrength)).toBeInTheDocument();
  });

  test('shows error for invalid domain', async () => {
    render(<Login />);
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'user@unknown.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: config.credentials.password },
    });
    fireEvent.click(screen.getByRole('button', { name: /signin/i }));

    expect(await screen.findByText(config.messages.invalidDomain)).toBeInTheDocument();
  });

  test('shows loading and success message for correct credentials', async () => {
    render(<Login />);
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: config.credentials.email },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: config.credentials.password },
    });
    fireEvent.click(screen.getByRole('button', { name: /signin/i }));

    expect(screen.getByText(config.messages.loading)).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByText(config.messages.success)).toBeInTheDocument(),
      { timeout: 3100 }
    );
  });

  test('shows loading and invalid message for incorrect credentials', async () => {
    render(<Login />);
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: config.credentials.email },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'Wrong@1234' },
    });
    fireEvent.click(screen.getByRole('button', { name: /signin/i }));

    expect(screen.getByText(config.messages.loading)).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByText(config.messages.invalid)).toBeInTheDocument(),
      { timeout: 3100 }
    );
  });

  test.each([
    'user@gmail.com',
    'user@yahoo.com',
    'user@outlook.com'
  ])('allows login for valid domain: %s', async (email) => {
    render(<Login />);
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: email },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: config.credentials.password },
    });
    fireEvent.click(screen.getByRole('button', { name: /signin/i }));

    await waitFor(() => {
      expect(screen.queryByText(config.messages.invalidDomain)).not.toBeInTheDocument();
    });
  });
});
