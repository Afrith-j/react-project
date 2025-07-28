import { render, screen } from '@testing-library/react';
import App from './App';

test('renders login component from App', () => {
  render(<App />);
  expect(screen.getByText(/Login/i)).toBeInTheDocument();
});
